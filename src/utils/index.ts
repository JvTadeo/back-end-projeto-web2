import { Data } from '../models/data';

export class Utils {
    
    public static timestampToDataInterface(timestamp: number): Data {
        const date = new Date(timestamp);
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
        };
    }
}