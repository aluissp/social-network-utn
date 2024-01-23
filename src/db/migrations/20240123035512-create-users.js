module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('users', {
			id: {
				type: Sequelize.DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
			},
			name: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.DataTypes.STRING,
				unique: true, // unique email
				allowNull: false,
			},
			password: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				defaultValue: Sequelize.DataTypes.NOW,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				defaultValue: Sequelize.DataTypes.NOW,
			},
		});
	},

	down: queryInterface => {
		return queryInterface.dropTable('users');
	},
};
