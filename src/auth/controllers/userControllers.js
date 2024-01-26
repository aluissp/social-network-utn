import db from '../../models/index.js';
import { userPublicKeys, profilePublicKeys } from '../helpers/index.js';
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

		const user = await User.create({ name, password: hashedPassword, email });

		return reduceObjectByKeys(user['dataValues'], userPublicKeys);
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

export const updateUser = async ({ id, name, password, email }) => {
	try {
		const newUser = { id };

		if (name) newUser.name = name;

		if (password) newUser.password = hashPasswordSync(password);

		if (email) newUser.email = email;

		await User.update(newUser, { where: { id } });

		return 'User updated';
	} catch (err) {
		throw err;
	}
};

// Profile
export const registerProfile = async ({ username, faculty }, userId) => {
	try {
		const user = await User.findOne({ where: { id: userId } });

		if (!user) throw 'Missing user';

		const profile = await user.createProfile({ username, faculty });

		return reduceObjectByKeys(profile['dataValues'], profilePublicKeys);
	} catch (err) {
		throw err;
	}
};
