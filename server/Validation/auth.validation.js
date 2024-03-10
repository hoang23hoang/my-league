export const validateRegister = (req, res, next) => {
    const { namePlayer, password, email, phone } = req.body;
    if (!namePlayer || !email || !password || !phone) {
        return res.status(400).json({ error: "NamePlayer, email, phone or password is required." });
    }
    next();
}

export const validateLogin = (req, res, next) => {
    const { phone, password, email } = req.body;
    if (!(phone ||! email)) {
        return res.status(400).json({ error: "You must provide either userplayer or email." });
    }
    if (!password) {
        return res.status(400).json({ error: "Password field can't be empty." });
    }
    next();
}
