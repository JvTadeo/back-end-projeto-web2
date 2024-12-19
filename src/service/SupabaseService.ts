import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { Product } from "../models/product";
import { Customer } from "../models/customer";
import { Sale } from "../models/sale";

// Load environment variables
dotenv.config();

export class SupabaseService {

    private createAuthenticatedClient(token: string) {
        return createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_KEY as string, {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        });
    }

    //#region GETS
    public async getAllProducts() : Promise<{ data: any; error: any }> {
        const supabase = this.createAuthenticatedClient('');
        const { data, error } = await supabase.from('Products').select('*');
        return { data, error };
    }

    public async getProductById(id: string) : Promise<{ data: any; error: any }> {
        const supabase = this.createAuthenticatedClient('');
        const { data, error } = await supabase.from('Products').select('*').eq('id', id);
        return { data, error };
    }

    public async getAllCustomers() : Promise<{ data: any; error: any }> {
        const supabase = this.createAuthenticatedClient('');
        const { data, error } = await supabase.from('Customers').select('*');
        return { data, error };
    }

    public async getSales() : Promise<{ data: any; error: any }> {
        const supabase = this.createAuthenticatedClient('');
        const { data, error } = await supabase.from('Sales').select('*');
        return { data, error };
    }

    public async getSalesByCustomerId( id: string) : Promise<{ data: any; error: any }> {
        const supabase = this.createAuthenticatedClient('');
        const { data, error } = await supabase.from('Sales').select('*').eq('customerId', id);
        return { data, error };
    }
    
    public async getSalesByPeriod(start_date: string, end_date: string): Promise<{ data: any; error: any }> {
        const supabase = this.createAuthenticatedClient('');
        const { data, error } = await supabase.from('Sales').select('*').gte('created_at', start_date).lte('created_at', end_date);
        return { data, error };
    }
    //#endregion

    //#region POSTS

    public async login( email: string, password: string) : Promise<{ data: any; error: any }> {
        const supabase = this.createAuthenticatedClient('');
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });
        return { data, error };
    }

    public async createProductWithIncrementedId(product: Product, token: string): Promise<{ data: any; error: any }> {
        const supabase = this.createAuthenticatedClient(token);
        
        // Get the last product ID
        const { data: lastProduct, error: lastProductError } = await supabase
            .from('Products')
            .select('id')
            .order('id', { ascending: false })
            .limit(1)
            .single();
        
        if (lastProductError) {
            return { data: null, error: lastProductError };
        }

        // Increment the ID
        const newProductId = lastProduct ? lastProduct.id + 1 : 1;
        product.id = newProductId;

        // Insert the new product
        const { data, error } = await supabase.from('Products').insert([product]);
        return { data, error };
    }

    public async createCustomerWithIncrementedId(customer: Customer, token: string): Promise<{ data: any; error: any }> {
        const supabase = this.createAuthenticatedClient(token);

        // Insert the new product
        const { data, error } = await supabase.from('Customers').insert([customer]);
        return { data, error };
    }

    public async createSaleWithIncrementedId(sale: Sale, token: string): Promise<{ data: any; error: any }> {
        const supabase = this.createAuthenticatedClient(token);
        
        // Get the last product ID
        const { data: lastSale, error: lastSaleError } = await supabase
            .from('Sales')
            .select('id')
            .order('id', { ascending: false })
            .limit(1)
            .single();
        
        if (lastSaleError) {
            return { data: null, error: lastSaleError };
        }

        // Increment the ID
        const newSaleId = lastSale ? lastSale.id + 1 : 1;
        sale.id = newSaleId;
        console.log(sale);
        sale.products.forEach(async (product) => {
            const { data, error } = await this.updateProductQuantity(product.product_id, product.quantity, token);
            if (error) {
                return { data: null, error };
            }
        })

        // Insert the new product
        const { data, error } = await supabase.from('Sales').insert([sale]);
        return { data, error };
    }

    private async updateProductQuantity(productId: number, quantitySold: number, token: string): Promise<{ data: any; error: any }> {
        const supabase = this.createAuthenticatedClient(token);

        // Get the current quantity of the product
        const { data: product, error: productError } = await supabase
            .from('Products')
            .select('stock')
            .eq('id', productId)
            .single();

        if (productError) {
            return { data: null, error: productError };
        }

        // Calculate the new quantity
        console.log(`Current Stock ${product.stock} - Quantity Sold ${quantitySold}`);
        const newQuantity = product.stock - quantitySold;

        // Update the product quantity
        const { data, error } = await supabase
            .from('Products')
            .update({ stock: newQuantity })
            .eq('id', productId);

        return { data, error };
    }

    //#region 

    //#region PUTS

    public async updateProduct(product: Product, token: string): Promise<{ data: any; error: any }> {
        const supabase = this.createAuthenticatedClient(token);
        const { data, error } = await supabase.from('Products').update(product).eq('id', product.id);
        return { data, error };
    }

    public async updateCustomer(customer: Customer, token: string): Promise<{ data: any; error: any }> {
        const supabase = this.createAuthenticatedClient(token);
        const { data, error } = await supabase.from('Customers').update(customer).eq('cpf', parseInt(customer.cpf));
        return { data, error };
    }

    //#endregion

    //#region DELETE

    public async deleteCustomerByCpf(cpf: string, token: string) : Promise<{ data: any; error: any }> {
        const supabase = this.createAuthenticatedClient(token);
        const { data, error } = await supabase.from('Customers').delete().eq('cpf', parseInt(cpf));
        return { data, error };
    }

    public async deleteProductById(id: string, token: string) : Promise<{ data: any; error: any }> {
        const supabase = this.createAuthenticatedClient("");

        const product = await this.getProductById(id);

        await this.deleteImage(product.data[0].image_url, token);

        const { data, error } = await supabase.from('Products').delete().eq('id', id);

        return { data, error };
    }

    public async deleteImage(imageUrl: string, token: string) : Promise<{ data: any; error: any }> {
        const supabase = this.createAuthenticatedClient(token);

        const imagePath = this.extractImagePathFromSignedUrl(imageUrl)

        const { data, error } = await supabase.storage.from('uploads').remove([imagePath]);
        return { data, error };
    }

    //#endregion

    //#region Public
    public async verifyUser(token: string) : Promise<{ data: any; error: any }> {
        const supabase = this.createAuthenticatedClient('');
        const { data, error } = await supabase.auth.getUser(token);
        return { data, error };
    }
    //#endregion

    //#region Private

    private extractImagePathFromSignedUrl(signedUrl: string): string {
        // Verifica se a URL possui a parte '/object/sign/'
        const parts = signedUrl.split('/object/sign/');
        if (parts.length > 1) {
            // A primeira parte contém a base da URL (não precisamos disso), então pegamos a segunda
            const pathWithToken = parts[1];
    
            // Dividimos a URL no token (parte após '?')
            const path = pathWithToken.split('?')[0]; 

            // Retorna o caminho do arquivo dentro do bucket
            return path; // Exemplo: "uploads/5353285.webp"
        }
    
        // Se não encontrar a parte "/object/sign/", lança um erro
        throw new Error('Invalid signed URL');
    }

    //#endregion
}