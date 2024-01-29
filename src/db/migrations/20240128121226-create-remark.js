module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('remarks', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			content: {
				type: Sequelize.STRING,
			},
			postId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'posts',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			profileId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'profiles',
					key: 'id',
				},
				onDelete: 'CASCADE',
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
		await queryInterface.dropTable('remarks');
	},
};
