import 'module-alias/register.js';

import express from 'express';
import {CorsOptions} from 'cors';
import cors from 'cors';
import authRoutes from '@/routes/authRoutes';
import cookieParser from 'cookie-parser';
import professorsRoutes from '@/routes/professorsRoutes';
import submissionsRoutes from '@/submission/routes';
const corsOptions: CorsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:4173',
    process.env.ORIGIN || '',
  ],
  credentials: true,
};

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.get('/', async (req, res) => {
  res.send('helo world');
});

app.use('/api/auth', authRoutes);
app.use('/api/professors', professorsRoutes);
app.use('/api/submissions', submissionsRoutes);

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
