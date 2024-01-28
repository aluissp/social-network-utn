import validator from 'validator';
import { postTypes } from './types.js';

export const validatePostRequest = async ({ body }, type) => {
	if (!body) throw new Error('Missing data');

	if (type === postTypes.createPost) {
		const { title, description } = body;

		if (!title || !description) throw new Error('Missing data');
	}

	if (type === postTypes.updatePost) {
		const { title, description, imageUrl, likes } = body;

		if (!title && !description && !imageUrl && !likes) throw new Error('Missing data');

		if (imageUrl && !validator.isURL(imageUrl)) throw new Error('Invalid URL');

		if (likes && !validator.isInt(String(likes))) throw new Error('Invalid likes');
	}

	return 'Follow request validated';
};
