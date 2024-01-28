import mongoose from 'mongoose';

export const PostModel = mongoose.model(
	'Post',
	new mongoose.Schema({
		id: String,
		imageFile: {
			contentType: String,
			data: Buffer,
		},
	})
);
