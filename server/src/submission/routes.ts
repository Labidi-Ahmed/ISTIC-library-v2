import express from 'express';
import {createSubmission} from './controller';
import {sessionMiddleware} from '@/middlewares/sessionMiddleware';
import {upload} from '@/lib/mutler';

const router = express.Router();

router.post('/', sessionMiddleware, upload.single('file'), createSubmission);

export default router;
