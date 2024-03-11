import express from 'express';
import { asyncCatch } from '../Utils/trycatch.js';
import { addPlayerToTeam,removePlayerFromTeam } from '../Controllers/addPlayerToTeam.controller.js';

const addToTeamRouter = express.Router();

addToTeamRouter.post('/add-to-team', asyncCatch(addPlayerToTeam));
addToTeamRouter.post('/remove-from-team',asyncCatch(removePlayerFromTeam));

export default addToTeamRouter;
