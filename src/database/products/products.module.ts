import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { Product, ProductSchema } from '../schemas/product.schema';
import { SuppliersModule } from '../suppliers/suppliers.module';

@Module({
    imports: [SuppliersModule, MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
    controllers: [ProductController],
    providers: [ProductService],
})
export class ProductsModule { }