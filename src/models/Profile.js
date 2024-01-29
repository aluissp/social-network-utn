export const Profile = (sequelize, Sequelize) => {
	const Profile = sequelize.define('profiles', {
		username: Sequelize.DataTypes.STRING,
		faculty: Sequelize.DataTypes.STRING,
	});

	return Profile;
};
