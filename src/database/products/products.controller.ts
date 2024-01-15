import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductService } from './products.service';
import { SupplierService } from '../suppliers/suppliers.service';


@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService, private readonly supplierService: SupplierService) { }

    @Post()
    async createProduct(@Res() response, @Body() CreateProductDto: CreateProductDto) {
        try {
            const productSupplier = await this.supplierService.getSupplier(CreateProductDto.supplierId);
            const newProduct = await this.productService.createProduct(CreateProductDto);
            productSupplier.products.push(newProduct._id);
            productSupplier.productCount++;
            await this.supplierService.updateSupplier(productSupplier._id, productSupplier);
            return response.status(HttpStatus.CREATED).json({
                message: 'Product has been created successfully',
                newProduct,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Product not created! Check supplierId and other values.',
                error: 'Bad Request'
            });
        }
    }

    @Put('/:id')
    async updateProduct(@Res() response, @Param('id') productId: string,
        @Body() updateProductDto: UpdateProductDto) {
        try {
            const existingProduct = await this.productService.updateProduct(productId, updateProductDto);
            return response.status(HttpStatus.OK).json({
                message: 'Product has been successfully updated',
                existingProduct,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    async getProducts(@Res() response) {
        try {
            const productData = await this.productService.getAllProducts();
            return response.status(HttpStatus.OK).json({
                message: 'All products data found successfully', productData,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    async getProduct(@Res() response, @Param('id') productId: string) {
        try {
            const existingProduct = await
                this.productService.getProduct(productId);
            return response.status(HttpStatus.OK).json({
                message: 'Product found successfully', existingProduct,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    async deleteProduct(@Res() response, @Param('id') productId: string) {
        try {
            const product = await this.productService.getProduct(productId);
            const productSupplier = await this.supplierService.getSupplier(product.supplierId);
            await this.productService.deleteProduct(productId);
            productSupplier.products.splice(productSupplier.products.indexOf(productId), 1);
            productSupplier.productCount--;
            await this.supplierService.updateSupplier(productSupplier._id, productSupplier);
            return response.status(HttpStatus.OK).json({
                message: 'Product deleted successfully',
                product,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}