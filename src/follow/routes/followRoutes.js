import { Router } from 'express';
import * as followHandlers from '../handlers/index.js';

const router = Router();

router.route('/:profileToFollowId').post(followHandlers.followUser);

export default router;
