import express from 'express';
import { asyncCatch } from '../Utils/trycatch.js';
import { createTeam } from '../Controllers/createTeam.controller.js';
import { authenticateToken } from '../Middleware/authenMiddleware.js';

const createTeamRouter = express.Router();

createTeamRouter.post('/createTeam', asyncCatch(authenticateToken), asyncCatch(createTeam));

export default createTeamRouter;
