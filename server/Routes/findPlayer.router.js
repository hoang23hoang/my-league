import express from 'express';
import { findPlayer } from '../Controllers/findPlayer.controller.js';

const findPlayerRouter = express.Router();

findPlayerRouter.get('/players', findPlayer);

export default findPlayerRouter;
