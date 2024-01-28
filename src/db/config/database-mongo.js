import mongoose from 'mongoose';

const username = 'luis';
const password = 'luis';
let database = 'db';

if (process.env?.NODE_ENV === 'test') database = 'testdb';

mongoose.connect(
	`mongodb+srv://${username}:${password}@social-network-mongo.gkdhfaf.mongodb.net/${database}`
);

const { connection } = mongoose;

connection.on('error', console.log);

connection.once('connected', () => console.log('Database connected!'));

export default {};
