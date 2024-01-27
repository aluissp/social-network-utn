import { to } from '../../tools/index.js';
import * as followController from '../controllers/index.js';
import { getUserIdFromRequest } from '../../auth/helpers/index.js';
import { validateFollowRequest, followTypes } from '../helpers/index.js';

export const followUser = async (req, res) => {
	const [errFollow] = await to(validateFollowRequest(req, followTypes.follow));

	if (errFollow) return res.status(400).send({ message: errFollow.message });

	const userId = getUserIdFromRequest(req);
	const profileToFollowId = +req.params.profileToFollowId;

	const [err, message] = await to(followController.followAnUser({ userId, profileToFollowId }));

	if (err) return res.status(401).send({ message: err.message });

	res.status(200).send({ message });
};
