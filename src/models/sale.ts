import { Data } from "./data";

export interface Sale {
    id: number;
    customerId: number;
    products: { product_id: number; quantity: number }[];
    total: number;
    created_at: Data | Date;
}