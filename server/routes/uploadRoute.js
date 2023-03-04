import { Router } from 'express';
import { unlink } from 'fs/promises';
import upload from '../middlewares/upload.js';
import Card from '../models/cardModel.js';

const router = Router();

router.post('/', upload.single('file'), (req, res) => {
  try {
    const decodedFileName = decodeURI(req.file.originalname);
    return res.json({
      url: `/uploads/${req.file.filename}`,
      name: decodedFileName,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/delete', async (req, res) => {
  try {
    const { path } = req.body;
    const cards = await Card.find({ 'attachments.url': path });
    if (cards.length === 1) {
      await unlink(`.${path}`);
      return res.status(200).json({ message: 'Файл удален' });
    }
    return res.status(200).json({ message: 'Ссылка на файл используется в других карточках' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
