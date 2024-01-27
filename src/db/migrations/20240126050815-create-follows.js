module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('follows', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			profileId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'profiles',
					key: 'id',
				},
				allowNull: false,
			},
			followingId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'profiles',
					key: 'id',
				},
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('follows');
	},
};
