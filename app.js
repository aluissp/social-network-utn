import express from 'express';
// import _ from './src/db/database.js';
import { setupMiddleware } from './src/middlewares/index.js';
import authRoutes from './src/auth/routes/authRoutes.js';

const app = express();
const port = 3000;

setupMiddleware(app);

app.get('/', (req, res) => {
	res.status(200).send('Hello world.');
});

// Routes
app.use('/auth', authRoutes);
// app.use('/teams', teamRoutes);

app.listen(port, () => {
	console.log('Server started at port 3000.');
});

export default app;
