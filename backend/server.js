import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
import heroRoutes from './routes/heroRoutes.js'
import servicesRoutes from './routes/servicesRoutes.js'
import eventsRoutes from './routes/eventsRoutes.js'
import commentsRoutes from './routes/commentsRoutes.js'

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/comments', commentsRoutes);

app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));