import cors from 'cors';
import express from 'express';

import claimRoutes from './routes/claimRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({
    service: 'gigguard-backend',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', claimRoutes);

app.use((err, _req, res, _next) => {
  console.error('Unhandled backend error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Unexpected backend failure. Inspect server logs for details.',
  });
});

export default app;
