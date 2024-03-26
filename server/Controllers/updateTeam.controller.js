import { teamModel } from "../Models/team.model.js";

export const updatedTeam = async(req,res)=>{
    const { teamId } = req.params; 
    const { nameTeam, colorShirt, players, place } = req.body; 

    try {
        const updatedTeam = await teamModel.findByIdAndUpdate(teamId, {
            nameTeam,
            colorShirt,
            players,
            place
        }, { new: true }); 

        if (!updatedTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }

        res.json(updatedTeam);
    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}