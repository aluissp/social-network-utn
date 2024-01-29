module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('profiles', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			username: {
				type: Sequelize.STRING,
			},
			faculty: {
				type: Sequelize.STRING,
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

		// Add a foreign key
		await queryInterface.addColumn(
			'profiles', // name of Source model
			'userId', // name of the key we're adding
			{
				type: Sequelize.INTEGER,
				references: {
					model: 'users', // name of Target model
					key: 'id', // key in Target model that we're referencing
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			}
		);
	},
	async down(queryInterface, Sequelize) {
		// Remove a foreign key
		await queryInterface.removeColumn(
			'profiles', // name of Source model
			'userId' // key we want to remove
		);

		await queryInterface.dropTable('profiles');
	},
};
