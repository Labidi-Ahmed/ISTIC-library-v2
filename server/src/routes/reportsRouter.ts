// authRoutes.js
import express, {RequestHandler} from 'express';

import {sessionMiddleware} from '@/middlewares/sessionMiddleware';
import {upload} from '@/services/mutler';
import {publishReport} from '@/controllers/publish-report';
const router = express.Router();

router.post('/', sessionMiddleware, upload.single('pdfFile'), publishReport);

export default router;
