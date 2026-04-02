import express, { Response, Router } from 'express';
import { upload } from '../config/cloudinary';
import { protect, admin } from '../middleware/authMiddleware';

const router: Router = express.Router();

// @desc    Upload image to Cloudinary
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), (req: any, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.send({
    message: 'Image Uploaded',
    url: req.file.path,
  });
});

export default router;
