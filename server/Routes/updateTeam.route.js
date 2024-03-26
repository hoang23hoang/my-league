import express from 'express';
import { asyncCatch } from '../Utils/trycatch.js';
import { authenticateToken } from '../Middleware/authenMiddleware.js';
import { updatedTeam } from '../Controllers/updateTeam.controller.js';

const updatedTeamRouter = express.Router();

updatedTeamRouter.put('/updateTeam/:teamId', asyncCatch(authenticateToken), asyncCatch(updatedTeam));

export default updatedTeamRouter;
