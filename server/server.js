import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from 'dotenv';
import authRouter from './Routes/auth.route.js';
import uploadRouter from './Routes/upload.route.js';
import createTeamRouter from './Routes/createTeam.route.js';
import addToTeamRouter from './Routes/addToTeam.route.js';
import findPlayerRouter from './Routes/findPlayer.router.js';
import findTeamRouter from './Routes/findTeam.route.js';
import myTeamRouter from './Routes/myTeam.route.js';

dotenv.config();
const server = express();
const port = process.env.PORT || 3001; 

server.use(express.json());
server.use(cors());

mongoose.connect(process.env.MONGODB)
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

server.use('/auth', authRouter);
server.use('/team', uploadRouter);
server.use('/teams',createTeamRouter);
server.use('/add-player-to-team',addToTeamRouter);
server.use('/find',findPlayerRouter,findTeamRouter);
server.use('/player',myTeamRouter)
server.listen(port, () => {
    console.log('Server is listening on port', port);
});
