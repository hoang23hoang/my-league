import { teamModel } from "../Models/team.model.js";

export const getTeam = async (req, res) => {
    try {
        const teams = await teamModel.find().populate('players');
        if(teams.length === 0){
            return res.status(404).json({message: 'No Teams Found'});
        } else {
            const resultTeam = teams.map(team => {
                const memberCount = team.players.length;
                return {
                    _id: team._id,
                    nameTeam: team.nameTeam,
                    logo: team.logo,
                    colorShirt: team.colorShirt,
                    memberCount: memberCount
                };
            });
            return res.status(200).json(resultTeam);
        }
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
