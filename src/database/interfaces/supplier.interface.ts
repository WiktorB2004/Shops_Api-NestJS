import { Document } from 'mongoose';

export interface ISupplier extends Document {
    readonly supplierN: string;
    readonly phoneNumber: string;
    readonly email: string;
    readonly products: [string];
    readonly productCount: number;
}