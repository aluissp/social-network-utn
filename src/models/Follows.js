export const Follows = (sequelize, DataTypes) => {
	const Follows = sequelize.define('follows', {
		profileId: DataTypes.INTEGER,
		followingId: DataTypes.INTEGER,
	});

	return Follows;
};
