import { teamModel } from '../Models/team.model.js';

export const deleteTeam = async (req, res) => {
    try {
        const { idTeam } = req.params; 
        const team = await teamModel.findById(idTeam);
        if (!team) {
            return res.status(404).json({ message: 'Không tìm thấy đội bóng.' });
        }
        await teamModel.findByIdAndDelete(idTeam);

        res.status(200).json({ message: 'Đội bóng đã được xóa thành công.' });
    } catch (error) {
        console.error('Lỗi khi xóa đội bóng:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa đội bóng.' });
    }
};
