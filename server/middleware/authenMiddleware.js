import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const headers = req.headers['authorization'];
    const token = headers.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access token is missing');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        req.user = decoded;
        console.log(req.user.namePlayer);
        next();
    } catch (error) {
        console.error('Error authenticating token:', error);
        return res.status(403).send('Invalid access token');
    }
};
