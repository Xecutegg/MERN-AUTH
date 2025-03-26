import express from 'express';
import userAuth from '../middleware/userAuth.js';
import { getUSerDeta } from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.get('/data', userAuth, getUSerDeta);

export default userRoutes;