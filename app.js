import cors from 'cors';
import express from 'express';
import _ from './src/db/config/database-mongo.js';
import { setupMiddleware } from './src/middlewares/index.js';
import authRoutes from './src/auth/routes/authRoutes.js';
import postRoutes from './src/post/routes/postRoutes.js';
import followRoutes from './src/follow/routes/followRoutes.js';
import remarkRoutes from './src/remark/routes/remarkRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// CORS
app.use(cors());

setupMiddleware(app);

app.get('/', (req, res) => {
	res.status(200).send('Hello world.');
});

// Routes
app.use('/auth', authRoutes);
app.use('/post', postRoutes);
app.use('/follow', followRoutes);
app.use('/post', remarkRoutes);

app.listen(port, () => {
	console.log(`Server started at port ${port}.`);
});

export default app;
