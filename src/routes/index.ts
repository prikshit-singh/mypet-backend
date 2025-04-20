import { Router } from 'express';

const router = Router();
console.log('ping route')
router.get('/ping', (_req, res) => {
  res.send('pong 🏓');
});

export default router;
