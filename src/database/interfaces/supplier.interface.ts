import { Document } from 'mongoose';

export interface ISupplier extends Document {
    readonly supplierName: string;
    readonly phoneNumber: string;
    readonly email: string;
    products: [string];
    productCount: number;
}