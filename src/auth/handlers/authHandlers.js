import jwt from 'jsonwebtoken';
import { to } from '../../tools/index.js';
import { secretKey } from '../../config/constants.js';
import * as usersControllers from '../controllers/userControllers.js';

export const getAuthUser = (req, res) => {
	res.status(200).send('GET Auth router.');
};

export const postAuthUser = (req, res) => {
	res.send('POST Auth router');
};

export const userLogin = async (req, res) => {
	res.send('POST Auth userLogin() router');
	// if (!req.body || !req.body.user || !req.body.password) {
	// 	return res.status(400).json({ message: 'Missing data' });
	// }

	// const [err, result] = await to(
	// 	usersControllers.checkUserCredentials(req.body.user, req.body.password)
	// );

	// if (err || !result) {
	// 	return res.status(401).json({ message: 'Invalid credentials.' });
	// }

	// const user = await usersControllers.getUserIdFromUserName(req.body.user);
	// const token = jwt.sign({ userId: user.userId }, secretKey, { expiresIn: '1h' });

	// res.status(200).json({ token });
};
