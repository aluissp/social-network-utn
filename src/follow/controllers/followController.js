import db from '../../models/index.js';

const { User, Profile } = db;

export const followAnUser = async ({ userId, profileToFollowId }) => {
	const profileToFollow = await Profile.findOne({ where: { id: profileToFollowId } });

	if (!profileToFollow) throw new Error('Profile not found');

	const user = await User.findOne({ where: { id: userId }, include: Profile });

	if (!user) throw new Error('User not found');

	const userProfile = user.profile;

	if (userProfile.id === profileToFollow.id) throw new Error('You can not follow yourself');

	const isFollowing = await userProfile.hasFollowing(profileToFollow);

	if (isFollowing) throw new Error('You are already following this user');

	await userProfile.addFollowing(profileToFollow);

	return 'User followed successfully';
};
