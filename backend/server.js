import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRountes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';


const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

// api endpoints
app.get('/', (req, res) => {res.send('Hello World!');});
app.use('/api/auth', authRountes);
app.use('/api/user', userRoutes);
// start the server

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});