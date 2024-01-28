import mongoose from 'mongoose';

export const UserModel = mongoose.model(
	'User',
	new mongoose.Schema({
		id: String,
		imageFile: {
			contentType: String,
			data: Buffer,
		},
	})
);
