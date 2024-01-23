import bodyParser from 'body-parser';
import authMiddleware from './auth-middleware.js';

export const setupMiddleware = app => {
	app.use(bodyParser.json());
	authMiddleware.init();
	app.use(authMiddleware.protectWithJwt);
};
