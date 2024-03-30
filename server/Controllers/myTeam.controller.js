import { teamModel } from '../Models/team.model.js';

export const getMyTeam = async (req, res) => {
    try {
        const team = await teamModel.findOne({ ownerId: req.user.id });
        if (!team) {
            return res.status(404).json({ message: 'Team not found.' });
        }
        res.status(200).json({ team });
    } catch (error) {
        console.error('Error fetching team:', error);
        res.status(500).json({ message: 'Error fetching team.' });
    }
};
