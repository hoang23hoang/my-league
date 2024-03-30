import { playerModel } from '../Models/player.model.js';

export const findPlayer = async (req, res) => {
  const { phone } = req.query;

  try {
    const player = await playerModel.findOne({ phone });

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.status(200).json(player);
  } catch (error) {
    console.error('Error searching player:', error);
    res.status(500).json({ message: 'Error searching player' });
  }
};

export const findPlayerById = async (req, res) => {
  try {
    const { playerId } = req.params;

    const player = await playerModel.findById(playerId);

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};