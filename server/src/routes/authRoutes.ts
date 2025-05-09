// authRoutes.js
import express, {RequestHandler} from 'express';
import passport from 'passport';
import {
  createSession,
  deleteSessionTokenCookie,
  generateSessionToken,
  setSessionTokenCookie,
} from '@/services/authService';
import {User} from '@prisma/client';
import {sessionMiddleware} from '@/middlewares/sessionMiddleware';
const router = express.Router();

router.post('/logout', sessionMiddleware as RequestHandler, (req, res) => {
  deleteSessionTokenCookie(res);
  res.status(200).json({message: 'Logged out successfully'});
});
router.get('/check-auth', sessionMiddleware as RequestHandler, (req, res) => {
  res.status(200).json({user: req.user, authenticated: true});
});

router.get('/google', (req, res, next) => {
  passport.authenticate('google', {session: false})(req, res, next);
});
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
  }),
  async (req, res) => {
    const token = generateSessionToken();
    const session = await createSession(token, (req.user as User).id);
    setSessionTokenCookie(
      res,
      token,
      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    );

    res.redirect(`${process.env.ORIGIN}/app/books`);
  }
);

export default router;
