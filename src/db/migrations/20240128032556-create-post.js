module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('posts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			imageUrl: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING,
			},
			likes: {
				type: Sequelize.INTEGER,
			},
			profileId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'profiles',
					key: 'id',
				},
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
		await queryInterface.dropTable('posts');
	},
};
