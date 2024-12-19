import { Request, Response, NextFunction } from 'express';
import { SupabaseService } from '../service/SupabaseService';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'No token provided' });
        return;
    }

    const supabaseService = new SupabaseService();

    const {error} = await supabaseService.verifyUser(token);

    if (error) {
        res.status(401).json({ message: 'Invalid token' });
        return;
    }

    next();
};

export default authMiddleware;