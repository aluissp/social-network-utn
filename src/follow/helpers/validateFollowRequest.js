import { followTypes } from './types.js';

export const validateFollowRequest = async ({ body, params }, type) => {
	if (!body) throw new Error('Missing data');

	if (type === followTypes.follow) {
		const profileToFollowId = +params.profileToFollowId;

		if (!profileToFollowId) throw new Error('Missing profileToFollowId');
	}

	return 'Follow request validated';
};
