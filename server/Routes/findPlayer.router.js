import express from 'express';
import { findPlayer, findPlayerById } from '../Controllers/findPlayer.controller.js';

const findPlayerRouter = express.Router();

findPlayerRouter.get('/players', findPlayer);
findPlayerRouter.get('/players/:playerId', findPlayerById);

export default findPlayerRouter;
