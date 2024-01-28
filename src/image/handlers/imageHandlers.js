import { to } from '../../tools/index.js';
import * as imageControllers from '../controllers/imageControllers.js';

export const getProfileImage = async (req, res) => {
	const { userId } = req.params;

	const [err, image] = await to(imageControllers.getProfileImage(userId));

	if (err) return res.status(404).json({ message: 'Image not found' });

	res.end(Buffer.from(image.data, 'binary'));
};

export const uploadProfileImage = async (req, res) => {
	const userId = getUserIdFromRequest(req);

	const image = {
		contentType: req.file.mimetype,
		data: req.file.buffer,
	};

	const [err] = await to(imageControllers.recordProfileImage(image, userId));

	if (err) return res.status(500).json({ message: err.message });

	res.status(200).json({ message: 'Image saved successfully' });
};

export const removeProfileImage = async (req, res) => {
	const userId = getUserIdFromRequest(req);

	const [err] = await to(imageControllers.removeProfileImage(userId));

	if (err) return res.status(500).json({ message: err.message });

	res.status(200).json({ message: 'Image removed successfully' });
};
