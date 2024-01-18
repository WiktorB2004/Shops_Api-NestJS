import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { IProduct } from '../interfaces/product.interface';
import { Model } from "mongoose";


@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private productModel: Model<IProduct>) { }

    async createProduct(createProductDto: CreateProductDto): Promise<IProduct> {
        const newProduct = await this.productModel.create(createProductDto);
        return newProduct;
    }

    async updateProduct(productId: string, updateProductDto: UpdateProductDto): Promise<IProduct> {
        const existingProduct = await this.productModel.findByIdAndUpdate(productId, updateProductDto, { new: true });
        if (!existingProduct) {
            throw new NotFoundException(`Product #${productId} not found`);
        }
        return existingProduct;
    }

    async getAllProducts(): Promise<IProduct[]> {
        const productData = await this.productModel.find();
        if (!productData || productData.length == 0) {
            throw new NotFoundException('Product data not found!');
        }
        return productData;
    }

    async getProduct(productId: string): Promise<IProduct> {
        const existingProduct = await this.productModel.findById(productId).exec();
        if (!existingProduct) {
            throw new NotFoundException(`Product #${productId} not found`);
        }
        return existingProduct;
    }

    async deleteProduct(productId: string): Promise<IProduct> {
        const deletedProduct = await this.productModel.findByIdAndDelete(productId);
        if (!deletedProduct) {
            throw new NotFoundException(`Student #${productId} not found`);
        }
        return deletedProduct;
    }
}