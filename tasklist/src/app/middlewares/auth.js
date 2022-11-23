import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).json({ error: 'Empty authorization header' });

    const [, token] = authHeader.split('Bearer ');

    try {
        // Promisify é usado para poder usar async await em funções com callback no retorno
        const decoded = await promisify(jwt.verify)(token, authConfig.secret);
        req.userId = decoded.id;
        return next();
    } catch (e) {
        return res.status(401).json({ error: 'Invalid authorization header' });
    }
};
