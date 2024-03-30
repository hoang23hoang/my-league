import { teamModel } from "../Models/team.model.js";

export const createTeam = async (req, res) => {
    try {
        const { nameTeam, colorShirt, players, place } = req.body;
        const ownerId = req.user.id;

        const existingTeam = await teamModel.findOne({ nameTeam });

        if (existingTeam) {
            return res.status(400).json({ message: "Tên đội bóng đã tồn tại trong cơ sở dữ liệu" });
        }

        const newTeam = new teamModel({
            nameTeam,
            colorShirt,
            players,
            place,
            ownerId
        });

        const savedTeam = await newTeam.save();

        res.status(201).json(savedTeam);
    } catch (error) {
        console.error("Error creating team:", error);
        res.status(500).json({ message: "Error creating team" });
    }
};
