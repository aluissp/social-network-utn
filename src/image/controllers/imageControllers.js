import db from '../../models/index.js';
import { UserModel } from '../models/index.js';

const Profile = db.Profile;

export const getProfileImage = async id => {
	try {
		const user = await UserModel.findOne({ id });

		if (user) return user.imageFile;

		const defaultImage = await UserModel.findOne({ id: 'default' });

		if (!defaultImage) throw new Error('Default image not found');

		return defaultImage.imageFile;
	} catch (error) {
		throw error;
	}
};

export const recordProfileImage = async (imageFile, userId) => {
	try {
		const profile = await Profile.findOne({ where: { userId } });

		if (!profile) throw new Error('User not found');

		const user = await UserModel.findOne({ id: userId });

		if (user) throw new Error('You already have a profile image');

		await UserModel.create({ id: userId, imageFile });
	} catch (error) {
		throw error;
	}
};

export const removeProfileImage = async userId => {
	try {
		const profile = await Profile.findOne({ where: { userId } });

		if (!profile) throw new Error('User not found');

		const user = await UserModel.findOne({ id: userId });

		if (!user) throw new Error('You do not have a profile image');

		await UserModel.deleteOne({ id: userId });
	} catch (err) {
		throw err;
	}
};
