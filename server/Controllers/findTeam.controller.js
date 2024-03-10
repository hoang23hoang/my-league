import { teamModel } from "../Models/team.model.js";

export const getTeam = async (req, res) => {
    try {
        const teams = await teamModel.find();
        return res.status(200).json(teams);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
