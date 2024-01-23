import mongoose from 'mongoose';

const password = 'admin';
let database = 'db';

if (process.env.NODE_ENV === 'test') database = 'testdb';

// mongoose.connect(
// 	`mongodb+srv://admin:${password}@cluster0.p2hrynu.mongodb.net/${database}?retryWrites=true&w=majority`
// );

export default {};
