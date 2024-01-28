import { to } from '../../tools/index.js';
import * as postController from '../controllers/index.js';
import { getUserIdFromRequest } from '../../auth/helpers/index.js';
import { validatePostRequest, postTypes } from '../helpers/index.js';

export const getPosts = async (req, res) => {
	const [err, posts] = await to(postController.getAllPosts());

	if (err) return res.status(401).send({ message: err.message });

	res.status(200).send(posts);
};

export const createPost = async (req, res) => {
	const [errValidation] = await to(validatePostRequest(req, postTypes.createPost));

	if (errValidation) return res.status(401).send({ message: errValidation.message });

	const userId = getUserIdFromRequest(req);

	const [err, post] = await to(postController.createPost(req.body, userId));

	if (err) return res.status(401).send({ message: err.message });

	res.status(200).send({ post, message: 'Post created successfully' });
};

export const getOnePost = async (req, res) => {
	const { postId } = req.params;

	const [err, post] = await to(postController.getOnePost({ id: postId }));

	if (err) return res.status(401).send({ message: err.message });

	res.status(200).send({ post, message: 'Get post successfully' });
};

export const updatePost = async (req, res) => {
	const [errValidation] = await to(validatePostRequest(req, postTypes.updatePost));

	if (errValidation) return res.status(401).send({ message: errValidation.message });

	const userId = getUserIdFromRequest(req);

	const { postId: id } = req.params;

	const [err] = await to(postController.updatePost({ ...req.body, id }, userId));

	if (err) return res.status(401).send({ message: err.message });

	res.status(200).send({ message: 'Post updated successfully' });
};

export const deletePost = async (req, res) => {
	const [errValidation] = await to(validatePostRequest(req, postTypes.deletePost));

	if (errValidation) return res.status(401).send({ message: errValidation.message });

	const { postId } = req.params;

	const userId = getUserIdFromRequest(req);

	const [err] = await to(postController.deletePost({ postId, profileId: userId }));

	if (err) return res.status(401).send({ message: err.message });

	res.status(200).send({ message: 'Post deleted successfully' });
};
