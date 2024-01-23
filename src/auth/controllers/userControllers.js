import * as uuid from 'uuid';
import { to } from '../../tools/index.js';
import { hashPasswordSync, comparePassword } from '../../tools/index.js';

export const registerUser = async (userName, password) => {
	try {
		let hashedPassword = hashPasswordSync(password);
		const userId = uuid.v4();
		// const newUser = new UserModel({
		// 	userId,
		// 	userName,
		// 	password: hashedPassword,
		// });
		// await newUser.save();
		// await teams.bootstrapTeam(userId);
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
