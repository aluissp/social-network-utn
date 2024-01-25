import validator from 'validator';
import { userTypes } from './types.js';

export const checkUserFields = async ({ body }, type) => {
	if (!body) throw 'Missing data';

	if (type === userTypes.register) {
		const { name, password, email } = body;

		if (!name || !password || !email) throw 'Missing data';

		if (!validator.isLength(password, { min: 8 }))
			throw 'Password must be at least 8 characters long';

		if (!validator.isEmail(email)) throw 'Invalid email';
	}

	if (type === userTypes.login) {
		const { email, password } = body;

		if (!email || !password) throw 'Missing data';
	}

	if (type === userTypes.update) {
		const { name, password, email } = body;

		if (!name && !password && !email) throw 'Missing data';

		if (password && !validator.isLength(password, { min: 8 }))
			throw 'Password must be at least 8 characters long';

		if (email && !validator.isEmail(email)) throw 'Invalid email';
	}

	return 'User fields checked';
};
