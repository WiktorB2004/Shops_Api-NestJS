import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplierController } from './suppliers.controller';
import { SupplierService } from './suppliers.service';
import { Supplier, SupplierSchema } from '../schemas/supplier.schema';
import { DatabaseModule } from '../database.module';

@Module({
    imports: [MongooseModule.forFeature([{ name: Supplier.name, schema: SupplierSchema }]), forwardRef(() => DatabaseModule)],
    controllers: [SupplierController],
    providers: [SupplierService],
})
export class SuppliersModule { }