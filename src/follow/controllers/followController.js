import db from '../../models/index.js';
import { reduceObjectByKeys } from '../../tools/index.js';
import { profilePublicKeys } from '../../auth/helpers/index.js';

const { User, Profile, Follows } = db;

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

export const unFollowAnUser = async ({ userId, profileToFollowId }) => {
	const profileToFollow = await Profile.findOne({ where: { id: profileToFollowId } });

	if (!profileToFollow) throw new Error('Profile not found');

	const user = await User.findOne({ where: { id: userId }, include: Profile });

	if (!user) throw new Error('User not found');

	const userProfile = user.profile;

	if (userProfile.id === profileToFollow.id) throw new Error('You can not unfollow yourself');

	const isFollowing = await userProfile.hasFollowing(profileToFollow);

	if (!isFollowing) throw new Error('You are not following this user');

	await userProfile.removeFollowing(profileToFollow);

	return 'User unfollowed successfully';
};

export const getFollowersAndFollowing = async ({ userId }) => {
	const profile = await Profile.findOne({ where: { userId } });

	if (!profile) throw new Error('Profile not found');

	const following = await profile.getFollowing();

	let followers = (await Follows.findAll({ where: { followingId: profile.id } }))
		.map(follow => follow['dataValues'])
		.map(follow => Profile.findOne({ where: { id: follow['profileId'] } }));

	followers = await Promise.all(followers);

	return {
		following: following.map(follower =>
			reduceObjectByKeys(follower['dataValues'], profilePublicKeys)
		),
		followers: followers.map(follower =>
			reduceObjectByKeys(follower['dataValues'], profilePublicKeys)
		),
	};
};
