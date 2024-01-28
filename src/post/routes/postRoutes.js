import { Router } from 'express';
import * as postHandlers from '../handlers/index.js';

const router = Router();

router.route('/').get(postHandlers.getPosts);

router.route('/').post(postHandlers.createPost);

router.route('/:postId').get(postHandlers.getOnePost);

router.route('/:postId').put(postHandlers.updatePost);

router.route('/:postId').delete(postHandlers.deletePost);

export default router;
