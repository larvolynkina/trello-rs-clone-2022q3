import multer from 'multer';

const storage = multer.diskStorage({
  destination(_req, _file, cb) {
    cb(null, 'uploads');
  },
  filename(_req, file, cb) {
    cb(null, `${Date.now().toString()}${decodeURI(file.originalname)}`);
  },
});

export default multer({ storage });
