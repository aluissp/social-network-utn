import db from '../../models/index.js';
import { to } from '../../tools/index.js';
import { hashPasswordSync, comparePassword } from '../../tools/index.js';

const User = db.User;

export const registerUser = async ({ name, password, email }) => {
	try {
		const hashedPassword = hashPasswordSync(password);

		await User.create({ name, password: hashedPassword, email });

		return 'User registered';
	} catch (err) {
		throw err;
	}
};

export const checkUserCredentials = async (userName, password) => {
	try {
		// const user = await getUserIdFromUserName(userName);

		// if (!user) throw 'Missing user';

		return 'User credentials checked';

		// comparePassword(password, user.password, (err, result) => {
		// 	if (err) {
		// 		reject(err);
		// 	} else {
		// 		resolve(result);
		// 	}
		// });
	} catch (err) {
		throw err;
	}
};

export const getUserIdFromUserName = async userName => {
	try {
		// let [err, result] = await to(UserModel.findOne({ userName }).exec());
		// if (err) return reject(err);
		// resolve(result);
		return 'User id from username';
	} catch (err) {
		throw err;
	}
};

export const getUser = async userId => {
	try {
		return 'aluissp';
		// let [err, result] = await to(UserModel.findOne({ userId }).exec());

		// if (err) throw err;

		// return result;
	} catch (err) {
		throw err;
	}
};
