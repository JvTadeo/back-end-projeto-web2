import { SupabaseService } from '../service/SupabaseService';
import { Product } from '../models/product';
import { Request, Response } from 'express';

export class ProductsController {
    private supabaseService : SupabaseService;

    constructor() {
        this.supabaseService = new SupabaseService();

        this.getProducts = this.getProducts.bind(this);
        this.createProduct = this.createProduct.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
        this.getProductById = this.getProductById.bind(this);
        this.deleteProductById = this.deleteProductById.bind(this);
    }

    public async getProducts(req: Request, res: Response) : Promise<void> {
        const {data, error} = await this.supabaseService.getAllProducts();

        if (error) {
            res.status(500).json(error);
            return
        }
        res.status(200).json(data);
    }

    public async getProductById(req: Request, res: Response) : Promise<void> {
        const { id } = req.params;

        const { data, error } = await this.supabaseService.getProductById(id);

        if (error) {
            res.status(500).json(error);
            return
        }

        res.status(200).json(data);
    }

    public async deleteProductById(req: Request, res: Response) : Promise<void> {
        const { id } = req.params;

        const token = req.headers.authorization as string;
        const tokenWithoutBearer = token.replace('Bearer ', '');

        const { data, error } = await this.supabaseService.deleteProductById(id, tokenWithoutBearer);

        if (error) {
            res.status(500).json(error);
            return
        }

        res.status(200).json({ message: 'Produto deletado com sucesso!' });
    }

    public async createProduct(req: Request, res: Response) : Promise<void> {
        const { name, description, price, stock, image_url, brand } = req.body;

        const token = req.headers.authorization as string;
        const tokenWithoutBearer = token.replace('Bearer ', '');

        const product : Product = { id:0, name, description, price, stock, image_url, brand }; 

        const { data, error } = await this.supabaseService.createProductWithIncrementedId(product, tokenWithoutBearer);

        if (error) {
            res.status(500).json(error);
            return
        }

        res.status(201).json({ message: 'Produto cadastrato com sucesso!' });
    }

    public async updateProduct(req: Request, res: Response) : Promise<void> {
        const { id, name, description, price, stock, image_url, brand } = req.body;

        const token = req.headers.authorization as string;
        const tokenWithoutBearer = token.replace('Bearer ', '');

        const product : Product = { id, name, description, price, stock, image_url, brand }; 

        const { data, error } = await this.supabaseService.updateProduct(product, tokenWithoutBearer);

        if (error) {
            res.status(500).json(error);
            return
        }

        res.status(200).json({ message: 'Produto atualizado com sucesso!' });
    }
}