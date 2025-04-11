import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ' )[1];

    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.'});

    try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
        next();
      } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token.' });
      }
};

