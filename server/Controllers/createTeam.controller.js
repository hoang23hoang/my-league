import { teamModel } from "../Models/team.model.js";

const createTeam = async (req, res) => {
    try {
        const { nameTeam, logo, colorShirt, players } = req.body;

        const existingTeam = await teamModel.findOne({ nameTeam: nameTeam });

        if (existingTeam) {
            return res.status(400).json({ message: "Tên đội bóng đã tồn tại trong cơ sở dữ liệu" });
        }

        const newTeam = new teamModel({
            nameTeam,
            logo,
            colorShirt,
            players
        });

        const savedTeam = await newTeam.save();

        res.status(201).json(savedTeam);
    } catch (error) {
        console.error("Error creating team:", error);
        res.status(500).json({ message: "Error creating team" });
    }
};

export { createTeam };
