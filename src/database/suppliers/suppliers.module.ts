import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplierController } from './suppliers.controller';
import { SupplierService } from './suppliers.service';
import { Supplier, SupplierSchema } from '../schemas/supplier.schema';
import { DatabaseModule } from '../database.module';


const SupplierModel = MongooseModule.forFeature([{ name: Supplier.name, schema: SupplierSchema }]);
@Module({
    imports: [SupplierModel, forwardRef(() => DatabaseModule)],
    controllers: [SupplierController],
    providers: [SupplierService],
    exports: [SupplierService, SupplierModel]
})
export class SuppliersModule { }