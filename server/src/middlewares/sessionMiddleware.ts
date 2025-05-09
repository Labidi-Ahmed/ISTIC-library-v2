import express, {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import {
  validateSessionToken,
  deleteSessionTokenCookie,
  setSessionTokenCookie,
} from '@/services/authService';

import {User} from '@prisma/client';
export const sessionMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // CSRF protection
  // if the request dont come from our app frontend url we dont process it
  if (req.method !== 'GET') {
    const origin = req.headers.origin;
    if (!origin || origin !== process.env.ORIGIN) {
      res.status(403).send('Forbidden');
      return;
    }
  }

  // Session validation
  const token = req.cookies.session;
  if (!token) {
    res.status(401).send('Unauthorized');
    return;
  }

  try {
    // validate the session by encoding the token
    // if its valid and didnt expire  reset the session date
    const {session, user} = await validateSessionToken(token);
    if (!session) {
      deleteSessionTokenCookie(res);
      res.status(401).send('Unauthorized');
      return;
    }

    // Attach user to request for downstream middleware
    req.user = user;

    // Refresh session cookie
    setSessionTokenCookie(res, token, session.expiresAt);

    next();
  } catch (error) {
    deleteSessionTokenCookie(res);
    res.status(401).send('Unauthorized');
    return;
  }
};

// Extend the Express Request type to include the authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: User; // Add the user property to the Request type
    }
  }
}
