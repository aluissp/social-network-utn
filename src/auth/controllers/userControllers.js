import db from '../../models/index.js';
import { userPublicKeys } from '../helpers/index.js';
import { hashPasswordSync, comparePassword, reduceObjectByKeys } from '../../tools/index.js';

const User = db.User;

export const getUserById = async id => {
	try {
		const user = await User.findOne({ where: { id } });

		if (!user) throw 'Missing user';

		return reduceObjectByKeys(user['dataValues'], userPublicKeys);
	} catch (error) {
		throw error;
	}
};

export const registerUser = async ({ name, password, email }) => {
	try {
		const hashedPassword = hashPasswordSync(password);

		await User.create({ name, password: hashedPassword, email });

		return 'User registered';
	} catch (err) {
		throw err;
	}
};

export const checkUserCredentials = async ({ email, password }) => {
	try {
		const user = await User.findOne({ where: { email } });

		if (!user) throw 'Missing user';

		comparePassword(password, user.password, (err, result) => {
			if (err) throw err;

			if (!result) throw 'Invalid credentials';
		});

		return reduceObjectByKeys(user['dataValues'], userPublicKeys);
	} catch (err) {
		throw err;
	}
};
