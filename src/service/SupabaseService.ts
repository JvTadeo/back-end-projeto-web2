import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

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
    //#region 
}