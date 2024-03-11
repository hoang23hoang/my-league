import { playerModel } from "../Models/player.model.js";
import { teamModel } from "../Models/team.model.js";

export const addPlayerToTeam = async (req, res) => {
    try {
        const { playerId, teamId } = req.body;

        const player = await playerModel.findById(playerId);
        const team = await teamModel.findById(teamId);

        if (!player || !team) {
            return res.status(404).json({ message: "Player or team not found" });
        }

        const existingPlayer = team.players.find(player => player._id.toString() === playerId);
        if (existingPlayer) {
            return res.status(400).json({ message: "Player already exists in the team" });
        }

        team.players.push(player.toObject());

        await team.save();

        res.status(200).json({ message: "Player added to team successfully" });
    } catch (error) {
        console.error("Error adding player to team:", error);
        res.status(500).json({ message: "Error adding player to team" });
    }
};

export const removePlayerFromTeam = async (req, res) => {
    try {
        const { playerId, teamId } = req.body;

        const team = await teamModel.findById(teamId);

        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }

        const playerIndex = team.players.findIndex(player => player._id.toString() === playerId);
        if (playerIndex === -1) {
            return res.status(404).json({ message: "Player not found in the team" });
        }

        team.players.splice(playerIndex, 1);

        await team.save();

        res.status(200).json({ message: "Player removed from team successfully" });
    } catch (error) {
        console.error("Error removing player from team:", error);
        res.status(500).json({ message: "Error removing player from team" });
    }
};
