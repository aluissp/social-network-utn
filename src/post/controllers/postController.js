import db from '../../models/index.js';

const { Post, Remark } = db;

export const getAllPosts = async () => {
	const posts = await Post.findAll({
		include: [{ model: Remark, include: [{ model: db.Profile, as: 'profile' }] }, 'profile'],
	});

	return posts;
};

export const getOnePost = async ({ id }) => {
	const posts = await Post.findOne({
		where: { id },
		include: [{ model: Remark, include: [{ model: db.Profile, as: 'profile' }] }, 'profile'],
	});

	return posts;
};

export const createPost = async ({ title, description }, profileId) => {
	const newPost = {
		title,
		description,
		likes: 0,
	};

	const post = await Post.create({ ...newPost, profileId });

	return post;
};

export const updatePost = async ({ id, title, likes, description }, profileId) => {
	const post = await Post.findOne({ where: { id, profileId } });

	if (!post) throw new Error('Post not found');

	const newPost = {
		title: title || post.title,
		description: description || post.description,
		likes: likes || post.likes,
	};

	await post.update(newPost);

	return 'Post updated successfully';
};

export const deletePost = async ({ postId, profileId }) => {
	const post = await Post.findOne({ where: { id: postId, profileId } });

	if (!post) throw new Error('Post not found');

	await post.destroy();

	return 'Post deleted successfully';
};
