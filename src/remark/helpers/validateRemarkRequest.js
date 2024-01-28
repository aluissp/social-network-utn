import validator from 'validator';
import { remarkTypes } from './types.js';

export const validateRemarkRequest = async ({ body }, type) => {
	if (!body) throw new Error('Missing data');

	if (type === remarkTypes.createRemark || type === remarkTypes.updateRemark) {
		const { content } = body;

		if (!content) throw new Error('Missing data');
	}

	return 'Remark request validated';
};
