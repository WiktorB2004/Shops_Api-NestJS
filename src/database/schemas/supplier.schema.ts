import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SupplierDocument = HydratedDocument<Supplier>;

@Schema()
export class Supplier {
    @Prop(String)
    supplierName: string;

    @Prop(String)
    phoneNumber: string;

    @Prop(String)
    email: string;

    @Prop([String])
    products: string[];

    @Prop(Number)
    productCount: number;
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);