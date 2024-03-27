import mongoose from "mongoose";

const Schema = mongoose.Schema;

const playerSchema = new Schema({
    namePlayer: String,
    email: String,
    phone: String,
    age: String,
    password: String,
    avatar: String,
    role: ['user'],
    team: { type: Schema.Types.ObjectId, ref: 'Team' }
}, { timestamps: true });

const playerModel = mongoose.model('Player', playerSchema);

export { playerModel };
