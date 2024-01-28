import { to } from '../../tools/index.js';
import * as imageControllers from '../controllers/index.js';
import { getUserIdFromRequest } from '../../auth/helpers/index.js';

export const getPostImage = async (req, res) => {
	const { postId } = req.params;

	const [err, image] = await to(imageControllers.getPostImage(postId));

	if (err) return res.status(404).json({ message: 'Image not found' });

	res.end(Buffer.from(image.data, 'binary'));
};

export const uploadPostImage = async (req, res) => {
	const { postId } = req.params;

	const userId = getUserIdFromRequest(req);

	const image = {
		contentType: req.file.mimetype,
		data: req.file.buffer,
	};

	const [err] = await to(imageControllers.recordPostImage(image, { userId, postId }));

	if (err) return res.status(500).json({ message: err.message });

	res.status(200).json({ message: 'Image saved successfully' });
};

export const removePostImage = async (req, res) => {
	const { postId } = req.params;

	const userId = getUserIdFromRequest(req);

	const [err] = await to(imageControllers.removePostImage({ postId, userId }));

	if (err) return res.status(500).json({ message: err.message });

	res.status(200).json({ message: 'Image removed successfully' });
};
