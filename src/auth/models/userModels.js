import mongoose from 'mongoose';

export const UserModel = mongoose.model('UserModel', {
	userName: String,
	password: String,
	userId: String,
});
