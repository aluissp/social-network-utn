const bcrypt = require('bcrypt');

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert('users', [
			{
				name: 'Perugachi Luis',
				email: 'luis@gmail.com',
				password: bcrypt.hashSync('test1234', 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Cachimuel Marlon',
				email: 'mbcachimuell@utn.edu.ec',
				password: bcrypt.hashSync('test1234', 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Enríquez David',
				email: 'edenriquezg@utn.edu.ec',
				password: bcrypt.hashSync('test1234', 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Faican Jonathan',
				email: 'jafaicanp@utn.edu.ec',
				password: bcrypt.hashSync('test1234', 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Ramírez Henry',
				email: 'lhramirezm@utn.edu.ec',
				password: bcrypt.hashSync('test1234', 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);

		await queryInterface.bulkInsert('profiles', [
			{
				username: 'aluissp',
				faculty: 'FICA',
				userId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: 'mbcachimuell',
				faculty: 'FICA',
				userId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: 'edenriquezg',
				faculty: 'FICA',
				userId: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: 'jafaicanp',
				faculty: 'FICA',
				userId: 4,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				username: 'lhramirezm',
				faculty: 'FECYT',
				userId: 5,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('profiles', null, {});
		await queryInterface.bulkDelete('users', null, {});
	},
};
