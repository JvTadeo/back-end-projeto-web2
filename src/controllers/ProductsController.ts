import { SupabaseService } from '../service/SupabaseService';
import { Request, Response } from 'express';

export class ProductsController {
    private supabaseService : SupabaseService;

    constructor() {
        this.supabaseService = new SupabaseService();

        this.getProducts = this.getProducts.bind(this);
        this.getCustomers = this.getCustomers.bind(this);
    }

    public async getProducts(req: Request, res: Response) {
        const {data, error} = await this.supabaseService.getAllProducts();

        if (error) {
            return res.status(500).json(error);
        }
        res.status(200).json(data);
    }

    public async getCustomers(req: Request, res: Response) {
        const {data, error} = await this.supabaseService.getAllCustomers();

        if (error) {
            return res.status(500).json(error);
        }
        res.status(200).json(data);
    }

}