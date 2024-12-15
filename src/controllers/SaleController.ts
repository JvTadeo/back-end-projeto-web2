import { SupabaseService } from '../service/SupabaseService';
import { Request, Response } from 'express';

export class SaleController {
    private supabaseService : SupabaseService;

    constructor() {
        this.supabaseService = new SupabaseService();

        this.getSales = this.getSales.bind(this);
    }

    public async getSales(req: Request, res: Response) : Promise<void> {
        const {data, error} = await this.supabaseService.getSales();

        if (error) {
            res.status(500).json(error);
            return
        }
        res.status(200).json(data);
    }
}