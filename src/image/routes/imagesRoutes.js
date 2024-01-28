import multer from 'multer';
import { Router } from 'express';
import * as imageHandlers from '../handlers/index.js';

const router = Router();
const upload = multer();

router.route('/profile/:userId').get(imageHandlers.getProfileImage);

router.route('/profile/upload').post(upload.single('profile'), imageHandlers.uploadProfileImage);

router.route('/profile/remove').delete(imageHandlers.removeProfileImage);

router.route('/post/:postId').post(imageHandlers.getProfileImage);

router.route('/post/upload').post(upload.single('post'), imageHandlers.uploadProfileImage);

router.route('/post/remove').delete(imageHandlers.removeProfileImage);

export default router;
