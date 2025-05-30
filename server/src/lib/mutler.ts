import multer from 'multer';

export const upload = multer({
  storage: multer.memoryStorage(), // Keep file in RAM as Buffer
  limits: {
    fileSize: 25 * 1024 * 1024, // 25MB (adjust based on your PDF sizes)
    files: 1,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
});
