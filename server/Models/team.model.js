import mongoose from "mongoose";

const Schema = mongoose.Schema;

const teamSchema = new Schema({
    nameTeam: {
        type: String,
        required: true
    },
    logo: String,
    colorShirt: String,
    place: String,
    players: [{ type: Schema.Types.ObjectId, ref: 'Player' }]
}, { timestamps: true });

const teamModel = mongoose.model('Team', teamSchema);

export { teamModel };
