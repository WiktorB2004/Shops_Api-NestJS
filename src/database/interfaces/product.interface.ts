import { Document } from 'mongoose';

export interface IProduct extends Document {
    readonly productName: string;
    readonly supplierId: string;
    readonly price: number;
}