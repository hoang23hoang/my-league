import express from 'express';
import { getTeam } from '../Controllers/findTeam.controller.js';
import { asyncCatch } from '../Utils/trycatch.js';
import { authenticateToken } from '../Middleware/authenMiddleware.js';

const findTeamRouter = express.Router();

findTeamRouter.get('/teams',asyncCatch(getTeam) );

export default findTeamRouter;
