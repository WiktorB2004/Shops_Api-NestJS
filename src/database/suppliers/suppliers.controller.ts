import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';
import { SupplierService } from './suppliers.service';
import { ProductService } from '../products/products.service';
import { Product } from '../schemas/product.schema';


@Controller('supplier')
export class SupplierController {
    constructor(private readonly supplierService: SupplierService, private readonly productService: ProductService) { }

    @Post()
    async createSupplier(@Res() response, @Body() CreateSupplierDto: CreateSupplierDto) {
        try {
            const newSupplier = await this.supplierService.createSupplier(CreateSupplierDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Supplier has been created successfully',
                newSupplier,
            });
        } catch (err) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: 400,
                message: 'Error: Supplier not created!',
                error: 'Bad Request'
            });
        }
    }

    @Put('/:id')
    async updateSupplier(@Res() response, @Param('id') supplierId: string,
        @Body() updateSupplierDto: UpdateSupplierDto) {
        try {
            const existingSupplier = await this.supplierService.updateSupplier(supplierId, updateSupplierDto);
            return response.status(HttpStatus.OK).json({
                message: 'Supplier has been successfully updated',
                existingSupplier,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get()
    async getSuppliers(@Res() response) {
        try {
            const supplierData = await this.supplierService.getAllSuppliers();
            return response.status(HttpStatus.OK).json({
                message: 'All suppliers data found successfully', supplierData,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id')
    async getSupplier(@Res() response, @Param('id') supplierId: string) {
        try {
            const existingSupplier = await this.supplierService.getSupplier(supplierId);
            return response.status(HttpStatus.OK).json({
                message: 'Supplier found successfully', existingSupplier,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('/:id/full')
    async getSupplierProducts(@Res() response, @Param('id') supplierId: string) {
        try {
            const existingSupplier = await this.supplierService.getSupplier(supplierId);
            let productsList: Product[] = await Promise.all(existingSupplier.products.map(async (x) => await this.productService.getProduct(x)));
            return response.status(HttpStatus.OK).json({
                message: 'Supplier found successfully', existingSupplier,
                info: `Supplier: ${existingSupplier.supplierName} found products list`, productsList
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }

    @Delete('/:id')
    async deleteSupplier(@Res() response, @Param('id') supplierId: string) {
        try {
            const deletedSupplier = await this.supplierService.deleteSupplier(supplierId);
            for (let productId of deletedSupplier.products) {
                await this.productService.deleteProduct(productId);
            }

            return response.status(HttpStatus.OK).json({
                message: 'Supplier deleted successfully',
                deletedSupplier,
            });
        } catch (err) {
            return response.status(err.status).json(err.response);
        }
    }
}