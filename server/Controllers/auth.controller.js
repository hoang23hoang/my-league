import { playerModel } from "../Models/player.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    const { email, password, namePlayer, phone, age } = req.body;

    const existingPlayer = await playerModel.findOne({ $or: [{ email }, { phone }] });
    if (existingPlayer) {
        return res.status(400).send("ĐĂNG KÝ KHÔNG THÀNH CÔNG: Email hoặc số điện thoại đã được sử dụng !");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const player = await playerModel.create({
        namePlayer,
        email,
        password: hashedPassword,
        phone,
        age
    });

    res.status(200).send(player);
}

export const login = async (req, res) => {
    const { email, password, phone } = req.body;

    try {
        const playerByEmail = await playerModel.findOne({ email: email });
        const playerByPhone = await playerModel.findOne({ phone: phone });

        const player = playerByEmail || playerByPhone;

        if (!player) {
            return res.status(404).send("Email or phone is not correct!");
        }
        if (!player) {
            return res.status(404).send("Email or phone is not correct!");
        }

        const passwordMatch = await bcrypt.compare(password, player.password);
        if (!passwordMatch) {
            return res.status(401).send("Email or phone is not correct!");
        }

        const payload = {
            id: player._id.toString(),
            namePlayer: player.namePlayer,
            email: player.email,
            phone: player.phone,
            roles: player.roles,
        }

        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
            expiresIn: "1h",
        });

        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
            expiresIn: "1d",
        });

        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("An error occurred during login.");
    }
}

export const logout = async (req, res) => {
    try {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        res.status(200).send("Logged out successfully.");
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).send("An error occurred during logout.");
    }
};
