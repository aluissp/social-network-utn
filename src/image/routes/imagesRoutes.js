import multer from 'multer';
import { Router } from 'express';
import * as imageHandlers from '../handlers/index.js';

const router = Router();
const upload = multer();

// Profile
router.route('/profile/:userId').get(imageHandlers.getProfileImage);

router.route('/profile/upload').post(upload.single('profile'), imageHandlers.uploadProfileImage);

router.route('/profile/remove').delete(imageHandlers.removeProfileImage);

// Post
router.route('/post/:postId').get(imageHandlers.getPostImage);

router.route('/post/upload/:postId').post(upload.single('post'), imageHandlers.uploadPostImage);

router.route('/post/remove/:postId').delete(imageHandlers.removePostImage);

export default router;
