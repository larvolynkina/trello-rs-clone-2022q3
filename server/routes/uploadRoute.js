import { Router } from 'express';
import upload from '../middlewares/upload.js';

const router = Router();

router.post('/', upload.single('file'), (req, res) => {
  try {
    return res.json({
      url: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
