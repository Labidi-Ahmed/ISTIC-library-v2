import express from 'express';
import {getAllProfessors} from '../controllers/professorController';
const router = express.Router();

router.get('/', getAllProfessors);

export default router;
