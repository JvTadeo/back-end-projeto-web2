import { SupabaseService } from '../service/SupabaseService';
import { Request, Response } from 'express';


export class CustomerController {
    private supabaseService : SupabaseService;
    
    constructor() {
        this.supabaseService = new SupabaseService();

        this.getCustomers = this.getCustomers.bind(this);
    }
    
    public async getCustomers(req: Request, res: Response) : Promise<void> {
        const {data, error} = await this.supabaseService.getAllCustomers();

        if (error) {
            res.status(500).json(error);
            return
        }
        res.status(200).json(data);
    }
}