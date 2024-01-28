import { Router } from 'express';
import * as followHandlers from '../handlers/index.js';

const router = Router();

router.route('/').get(followHandlers.getFollowsInfo);

router.route('/:profileToFollowId').post(followHandlers.followUser);

router.route('/:profileToFollowId').delete(followHandlers.unFollowUser);

export default router;
