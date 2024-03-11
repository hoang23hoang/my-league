import express from 'express';
import { asyncCatch } from '../Utils/trycatch.js';
import { getMyTeam } from '../Controllers/myTeam.controller.js';
import { authenticateToken } from '../Middleware/authenMiddleware.js';

const myTeamRouter = express.Router();

myTeamRouter.get('/my-team', asyncCatch(authenticateToken), asyncCatch(getMyTeam));

export default myTeamRouter;
