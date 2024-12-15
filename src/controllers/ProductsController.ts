import { SupabaseService } from '../service/SupabaseService';
import { Request, Response } from 'express';

export class ProductsController {
    private supabaseService : SupabaseService;

    constructor() {
        this.supabaseService = new SupabaseService();

        this.getProducts = this.getProducts.bind(this);
    }

    public async getProducts(req: Request, res: Response) : Promise<void> {
        const {data, error} = await this.supabaseService.getAllProducts();

        if (error) {
            res.status(500).json(error);
            return
        }
        res.status(200).json(data);
    }
}