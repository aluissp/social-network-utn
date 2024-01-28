import { Router } from 'express';
import * as remarkHandlers from '../handlers/index.js';

const router = Router();

router.route('/:postId').post(remarkHandlers.createRemark);

router.route('/:postId/remark/:remarkId').put(remarkHandlers.updateRemark);

router.route('/:postId/remark/:remarkId').delete(remarkHandlers.deleteRemark);

export default router;
