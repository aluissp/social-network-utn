import db from '../../models/index.js';

const { Post, Remark } = db;

export const createRemark = async ({ content }, { postId, profileId }) => {
	const post = await Post.findOne({ where: { id: postId } });

	if (!post) throw new Error('Post not found');

	await Remark.create({ content, postId, profileId });

	await post.reload({ include: Remark });

	return post;
};

export const updateRemark = async ({ id, content }, postId) => {
	const post = await Post.findOne({ where: { id: postId } });

	if (!post) throw new Error('Post not found');

	const remark = await Remark.findOne({ where: { id } });

	if (!remark) throw new Error('Remark not found');

	await remark.update({ content });

	await post.reload({ include: Remark });

	return post;
};

export const deleteRemark = async ({ id }) => {
	const remark = await Remark.findOne({ where: { id } });

	if (!remark) throw new Error('Remark not found');

	await remark.destroy();

	return 'Remark deleted successfully';
};
