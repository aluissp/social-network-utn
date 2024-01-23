export const User = (sequelize, Sequelize) => {
	const User = sequelize.define('users', {
		name: Sequelize.DataTypes.STRING,
		email: Sequelize.DataTypes.STRING,
		password: Sequelize.DataTypes.STRING,
	});

	return User;
};
