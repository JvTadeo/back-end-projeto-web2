export interface Sale {
    id: number;
    customerId: number;
    products: { productId: number; quantity: number }[];
    total: number;
}