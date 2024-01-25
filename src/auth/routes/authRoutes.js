import { Router } from 'express';
import * as authHandlers from '../handlers/index.js';

const router = Router();

// router.route('/').get(authHandlers.getAuthUser).post(authHandlers.postAuthUser);
router.route('/').get(authHandlers.getAuthUser);

router.route('/login').post(authHandlers.userLogin);

router.route('/refresh').post(authHandlers.refreshToken);

router.route('/register').post(authHandlers.postAuthUser);

export default router;
