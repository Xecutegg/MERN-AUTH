import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRountes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';


const app = express();
const port = process.env.PORT || 4000;
connectDB();

// const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Allow only your frontend origin
    credentials: true, // Allow credentials (cookies, authorization headers)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


// api endpoints
app.get('/', (req, res) => {res.send('Hello World!');});
app.use('/api/auth', authRountes);
app.use('/api/user', userRoutes);
// start the server

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});