import express from 'express';
import { asyncCatch } from '../Utils/trycatch.js';
import { addPlayerToTeam } from '../Controllers/addPlayerToTeam.controller.js';

const addToTeamRouter = express.Router();

addToTeamRouter.post('/add-to-team', asyncCatch(addPlayerToTeam));

export default addToTeamRouter;
