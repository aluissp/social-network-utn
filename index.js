import db from './src/models/index.js';

const User = db.User;

User.create({
	name: 'John Doe',
	email: 'test@mail.com',
	password: '123456',
});
