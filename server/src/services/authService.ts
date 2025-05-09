import passport from 'passport';
import {Profile, Strategy, VerifyCallback} from 'passport-google-oauth20';
import {prisma} from '@/lib/prisma';
import {Request} from 'express';
import type {User, Session} from '@prisma/client';
import {Response} from 'express';
import base32 from 'hi-base32';

import * as nodeCrypto from 'crypto';

const base32Encode = base32.encode;

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_SECRET_ID || '',
      callbackURL: '/api/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile', 'email'],
    },

    async (
      _req: Request,
      _accessToken,
      _refreshToken,
      profile: Profile,
      done: VerifyCallback
    ) => {
      console.log('profile', profile);
      const email = profile.emails![0].value;

      const username = profile.displayName;
      const avatarUrl = profile._json.picture || profile.photos![0].value;
      // 2. db lookup
      let user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      // 3. create user if not exists
      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            username,
            avatarUrl,
          },
        });
      }
      // 4. return user
      done(null, user);
    }
  )
);

// 20 byte randomString
export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  nodeCrypto.getRandomValues(bytes);
  let token = base32Encode(bytes);
  token = token.replace(/=/g, '').toLowerCase();

  return token;
}

export async function createSession(
  token: string,
  userId: string
): Promise<Session> {
  // The session ID will be SHA-256 hash of the token
  const sessionId = nodeCrypto.createHash('sha256').update(token).digest('hex');
  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30days
  };
  await prisma.session.create({
    data: session,
  });
  return session;
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  // find the session id by encoding the token
  // one way encoding the token
  const sessionId = nodeCrypto.createHash('sha256').update(token).digest('hex');
  // the session id cant be decoded incase the db is leacked  they cant access the tokens to login

  const result = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: true,
    },
  });
  if (result === null) {
    return {session: null, user: null};
  }
  const {user, ...session} = result;
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.session.delete({where: {id: sessionId}});
    return {session: null, user: null};
  }
  // extend the session expiration when it's close to expiration. less than 15 days
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await prisma.session.update({
      where: {
        id: session.id,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }
  return {session, user};
}
export type SessionValidationResult =
  | {session: Session; user: User}
  | {session: null; user: null};

export async function invalidateSession(sessionId: string): Promise<void> {
  await prisma.session.delete({where: {id: sessionId}});
}

export function setSessionTokenCookie(
  res: Response,
  token: string,
  expiresAt: Date
): void {
  res.cookie('session', token, {
    httpOnly: true,
    sameSite: 'lax',
    expires: expiresAt,
    path: '/',
    secure: process.env.ENV === 'PROD',
  });
}

export function deleteSessionTokenCookie(res: Response): void {
  res.cookie('session', '', {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
    secure: process.env.ENV === 'PROD',
  });
}
