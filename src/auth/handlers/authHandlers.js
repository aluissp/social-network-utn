import jwt from 'jsonwebtoken';
import { to } from '../../tools/index.js';
import { secretKey } from '../../config/constants.js';
import { checkUserFields, userTypes } from '../helpers/index.js';
import * as usersControllers from '../controllers/userControllers.js';

export const getAuthUser = (req, res) => {
	res.status(200).send('GET Auth router');
};

export const postAuthUser = async (req, res) => {
	const [errMessage] = await to(checkUserFields(req, userTypes.register));

	if (errMessage) return res.status(400).json({ message: errMessage });

	const newUser = {
		name: req.body.name,
		password: req.body.password,
		email: req.body.email,
	};

	const [err, result] = await to(usersControllers.registerUser(newUser));

	if (err || !result) return res.status(401).json({ message: 'Invalid data' });

	res.status(200).json({ message: 'User registered' });
};

export const userLogin = async (req, res) => {
	const [errMessage] = await to(checkUserFields(req, userTypes.login));

	if (errMessage) return res.status(400).json({ message: errMessage });

	const userRequest = {
		email: req.body.email,
		password: req.body.password,
	};

	const [err, user] = await to(usersControllers.checkUserCredentials(userRequest));

	if (err || !user) return res.status(401).json({ message: err || 'Invalid credentials' });

	const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

	res.status(200).json({ ...user, token, password: undefined });
};
