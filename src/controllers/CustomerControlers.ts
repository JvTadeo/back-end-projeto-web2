import { Customer } from '../models/customer';
import { SupabaseService } from '../service/SupabaseService';
import { Request, Response } from 'express';


export class CustomerController {
    private supabaseService : SupabaseService;
    
    constructor() {
        this.supabaseService = new SupabaseService();

        this.getCustomers = this.getCustomers.bind(this);
        this.createCustomer = this.createCustomer.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
    }
    
    public async getCustomers(req: Request, res: Response) : Promise<void> {
        const {data, error} = await this.supabaseService.getAllCustomers();

        if (error) {
            res.status(500).json(error);
            return
        }
        res.status(200).json(data);
    }

    public async createCustomer(req: Request, res: Response) : Promise<void> {
        const { name, email, phone, address } = req.body;

        const token = req.headers.authorization as string;
        const tokenWithoutBearer = token.replace('Bearer ', '');

        const customer : Customer = { id:0, name, email, phone, address };

        const { data, error } = await this.supabaseService.createCustomerWithIncrementedId(customer, tokenWithoutBearer);

        if (error) {
            res.status(500).json(error);
            return
        }

        res.status(201).json({ message: 'Cliente cadastrato com sucesso!' });
    }

    public async updateCustomer(req: Request, res: Response) : Promise<void> {
        const { id, name, email, phone, address } = req.body;

        const token = req.headers.authorization as string;
        const tokenWithoutBearer = token.replace('Bearer ', '');

        const customer : Customer = { id, name, email, phone, address };

        const { data, error } = await this.supabaseService.updateCustomer(customer, tokenWithoutBearer);

        if (error) {
            res.status(500).json(error);
            return
        }

        res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
    }
}