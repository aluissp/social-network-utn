import jwt from 'jsonwebtoken';
import { to } from '../../tools/index.js';
import { secretKey } from '../../config/constants.js';
import { checkUserFields, userTypes, getUserIdFromRequest } from '../helpers/index.js';
import * as usersControllers from '../controllers/userControllers.js';

export const getAuthUser = async (req, res) => {
	const userId = getUserIdFromRequest(req);

	const user = await usersControllers.getUserById(userId);

	res.status(200).json({ user, message: 'User found' });
};

export const postAuthUser = async (req, res) => {
	const [errMessage] = await to(checkUserFields(req, userTypes.register));

	if (errMessage) return res.status(400).json({ message: errMessage });

	const newUser = {
		name: req.body.name,
		password: req.body.password,
		email: req.body.email,
	};

	const newProfile = {
		username: req.body.username,
		faculty: req.body.faculty,
	};

	const [err, user] = await to(usersControllers.registerUser(newUser));

	if (err || !user) return res.status(401).json({ message: 'Invalid data' });

	const [errProfile, profile] = await to(usersControllers.registerProfile(newProfile, user.id));
	console.log(errProfile, profile);

	if (errProfile || !profile) return res.status(401).json({ message: 'Could not create profile' });

	res.status(200).json({ user, profile, message: 'User registered' });
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

	res.status(200).json({ ...user, token, password: undefined, message: 'User logged in' });
};

export const refreshToken = async (req, res) => {
	const userId = getUserIdFromRequest(req);

	const user = await usersControllers.getUserById(userId);

	const newToken = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });

	res.status(200).json({ ...user, token: newToken, password: undefined });
};

export const updateUser = async (req, res) => {
	const [errMessage] = await to(checkUserFields(req, userTypes.update));

	if (errMessage) return res.status(400).json({ message: errMessage });

	const userId = getUserIdFromRequest(req);

	const user = await usersControllers.getUserById(userId);

	const { name, email, password } = req.body;

	const updatedUser = {
		id: userId,
		name: name || user.name,
		email: email || user.email,
		password: password,
	};

	const [err, result] = await to(usersControllers.updateUser(updatedUser));

	if (err || !result) return res.status(401).json({ message: 'Invalid data' });

	res.status(200).json({ message: 'User updated' });
};
