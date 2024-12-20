import { SupabaseService } from '../service/SupabaseService';
import { Request, Response } from 'express';
import { Report } from '../models/report';
import { Sale } from '../models/sale';
import { Utils } from '../utils';

export class SaleController {
    private supabaseService : SupabaseService;

    constructor() {
        this.supabaseService = new SupabaseService();

        this.getSales = this.getSales.bind(this);
        this.getSalesByCustomerId = this.getSalesByCustomerId.bind(this);
        this.getSalesReportByCustomerId = this.getSalesReportByCustomerId.bind(this);
        this.getSalesByPeriod = this.getSalesByPeriod.bind(this);

        this.createSale = this.createSale.bind(this);
    }

    //#region Public
    public async getSales(req: Request, res: Response) : Promise<void> {
        const {data, error} = await this.supabaseService.getSales();

        if (error) {
            res.status(400).json(error);
            return
        }

        data.forEach((sale: any) => {
            sale.created_at = Utils.timestampToDataInterface(sale.created_at);
        });

        res.status(200).json(data);
    }

    public async getSalesByCustomerId(req: Request, res: Response) : Promise<void> {
        const {data, error} = await this.supabaseService.getSalesByCustomerId(req.params.customer_id);

        if (error) {
            res.status(404).json(error);
            return
        }

        data.forEach((sale: any) => {
            sale.created_at = Utils.timestampToDataInterface(sale.created_at);
        });

        res.status(200).json(data);
    }

    public async getSalesReportByCustomerId(req: Request, res: Response) : Promise<void> {
        const {data, error} = await this.supabaseService.getSalesByCustomerId(req.params.customer_id);
        const reportCreate = this.processReportData (data);
        if (error) {
            res.status(404).json(error);
            return
        }
        res.status(200).json(reportCreate);
    }

    public async getSalesByPeriod(req: Request, res: Response) : Promise<void> {
        const { start_date, end_date } = req.body
        const {data, error} = await this.supabaseService.getSalesByPeriod(start_date, end_date);

        if (error) {
            res.status(404).json(error);
            return
        }

        data.forEach((sale: any) => {
            sale.created_at = Utils.timestampToDataInterface(sale.created_at);
        });

        res.status(200).json(data);
    }

    public async createSale(req: Request, res: Response) : Promise<void> {
        const { customer_id, products, total } = req.body;
        
        const token = req.headers.authorization as string;
        const tokenWithoutBearer = token.replace('Bearer ', '');
        
        const sale : Sale = {customerId: customer_id, products, total, id: 0, created_at: new Date()};
        
        const { data, error } = await this.supabaseService.createSaleWithIncrementedId(sale, tokenWithoutBearer);
        
        if (error) {
            res.status(400).json(error);
            return
        }

        res.status(201).json({ message: 'Venda cadastrato com sucesso!' });
    }
    //#endregion

    //#region Private
    private processReportData ( data : any ) : Report {
        const newReport: Report = {
            customerId: '',
            totalSales: 0,
            sales: []
        };

        let total : number = 0

        // Set customer id
        newReport.customerId = data[0].customer_id;

        // Calculate total sales
        data.forEach((sale : any) => {
            total += sale.total;
        });
        newReport.totalSales = total;

        for (let index = 0; index < data.length; index++) {
            data[index].products.forEach((product : any) => {
                newReport.sales.push({
                    product_id: product.product_id,
                    quantity: product.quantity,
                    date: Utils.timestampToDataInterface(data[index].created_at)
                });
            });
        }

        return newReport;
    }
    //#endregion
}
