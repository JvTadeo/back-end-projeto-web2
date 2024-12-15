import { SupabaseService } from '../service/SupabaseService';
import { Request, Response } from 'express';

export class AuthController {
    private supabaseService : SupabaseService;

    constructor() {
        this.supabaseService = new SupabaseService();

        this.login = this.login.bind(this);
    }

    public async login(req: Request, res: Response) : Promise<void> {
        const { email, password } = req.body;
        const {data, error} = await this.supabaseService.login(email, password);

        if (error) {
            res.status(500).json(error);
            return
        }
        res.status(200).json(data);
    }
}