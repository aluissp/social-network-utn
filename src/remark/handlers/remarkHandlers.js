import { to } from '../../tools/index.js';
import * as remarkController from '../controllers/index.js';
import { remarkTypes, validateRemarkRequest } from '../helpers/index.js';

export const createRemark = async (req, res) => {
	const [errValidation] = await to(validateRemarkRequest(req, remarkTypes.createRemark));

	if (errValidation) return res.status(401).send({ message: errValidation.message });

	const { postId } = req.params;

	const [err, post] = await to(remarkController.createRemark(req.body, postId));

	if (err) return res.status(401).send({ message: err.message });

	res.status(200).send({ post, message: 'Remark created successfully' });
};

export const updateRemark = async (req, res) => {
	const [errValidation] = await to(validateRemarkRequest(req, remarkTypes.updateRemark));

	if (errValidation) return res.status(401).send({ message: errValidation.message });

	const { postId, remarkId: id } = req.params;

	const [err, post] = await to(remarkController.updateRemark({ ...req.body, id }, postId));

	if (err) return res.status(401).send({ message: err.message });

	res.status(200).send({ post, message: 'Remark updated successfully' });
};

export const deleteRemark = async (req, res) => {
	const [errValidation] = await to(validateRemarkRequest(req, remarkTypes.deleteRemark));

	if (errValidation) return res.status(401).send({ message: errValidation.message });

	const { remarkId } = req.params;

	const [err] = await to(remarkController.deleteRemark({ id: remarkId }));

	if (err) return res.status(401).send({ message: err.message });

	res.status(200).send({ message: 'Remark deleted successfully' });
};
