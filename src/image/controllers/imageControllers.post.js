import db from '../../models/index.js';
import { PostModel } from '../models/index.js';

const Profile = db.Profile;

export const getPostImage = async id => {
	try {
		const post = await PostModel.findOne({ id });

		if (post) return post.imageFile;

		const defaultImage = await PostModel.findOne({ id: 'default' });

		if (!defaultImage) throw new Error('Default image not found');

		return defaultImage.imageFile;
	} catch (error) {
		throw error;
	}
};

export const recordPostImage = async (imageFile, { userId, postId }) => {
	try {
		const profile = await Profile.findOne({ where: { userId }, include: 'posts' });

		if (!profile) throw new Error('User not found');

		const existPost = profile.posts.find(post => post.id == postId);

		if (!existPost) throw new Error('Post not found');

		const post = await PostModel.findOne({ id: postId });

		if (post) throw new Error('You already uploaded an image for this post');

		await PostModel.create({ id: postId, imageFile });
	} catch (error) {
		throw error;
	}
};

export const removePostImage = async ({ userId, postId }) => {
	try {
		const profile = await Profile.findOne({ where: { userId }, include: 'posts' });

		if (!profile) throw new Error('User not found');

		const existPost = profile.posts.find(post => post.id == postId);

		if (!existPost) throw new Error('Post not found');

		const post = await PostModel.findOne({ id: postId });

		if (!post) throw new Error('You already removed the image for this post');

		await PostModel.deleteOne({ id: postId });
	} catch (err) {
		throw err;
	}
};
