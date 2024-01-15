import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { Product, ProductSchema } from '../schemas/product.schema';
import { SuppliersModule } from '../suppliers/suppliers.module';


const ProductsModel = MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
@Module({
    imports: [ProductsModel, forwardRef(() => SuppliersModule)],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService, ProductsModel]
})
export class ProductsModule { }