import express from 'express';
// import _ from './src/db/database.js';
import { setupMiddleware } from './src/middlewares/index.js';
import authRoutes from './src/auth/routes/authRoutes.js';
import followRoutes from './src/follow/routes/followRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

setupMiddleware(app);

app.get('/', (req, res) => {
	res.status(200).send('Hello world.');
});

// Routes
app.use('/auth', authRoutes);
app.use('/follow', followRoutes);

app.listen(port, () => {
	console.log(`Server started at port ${port}.`);
});

export default app;
