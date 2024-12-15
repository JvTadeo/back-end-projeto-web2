import { Data } from "./data";
import { Sale } from "./sale";

export interface Report {
    customerId: string;
    totalSales: number;
    sales: {
        product_id: number; 
        quantity: number;  
        date: Data;
    }[];
}