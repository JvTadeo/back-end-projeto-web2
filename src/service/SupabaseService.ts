import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export class SupabaseService {

    private createAuthenticatedClient(token: string) {
        const supabaseUrl = process.env.SUPABASE_URL as string;
        const supabaseKey = process.env.SUPABASE_KEY as string;
        return createClient(supabaseUrl, supabaseKey);
    }

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
}