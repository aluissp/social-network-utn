import jwt from 'jsonwebtoken';
import { secretKey } from '../../config/constants.js';

export const getUserIdFromRequest = req => {
	const token = req.headers.authorization.split(' ')[1];
	const { userId } = jwt.verify(token, secretKey);

	return userId;
};
