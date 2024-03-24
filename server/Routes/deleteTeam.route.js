import express from 'express';
import { asyncCatch } from '../Utils/trycatch.js';
import { authenticateToken } from '../Middleware/authenMiddleware.js';
import { deleteTeam } from '../Controllers/deleteTeam.controller.js';

const deleteTeamRouter = express.Router();

deleteTeamRouter.delete('/delete-team/:idTeam', asyncCatch(authenticateToken), asyncCatch(deleteTeam));

export default deleteTeamRouter;
