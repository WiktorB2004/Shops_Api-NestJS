import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductService } from './products.service';


@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    async createProduct(@Res() response, @Body() CreateProductDto: CreateProductDto) {
        try {
            const newProduct = await this.productService.createProduct(CreateProductDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Product has been created successfully',
                newProduct,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Product not created!',
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
            const deletedProduct = await this.productService.deleteProduct(productId);
            return response.status(HttpStatus.OK).json({
                message: 'Product deleted successfully',
                deletedProduct,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}