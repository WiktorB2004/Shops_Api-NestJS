import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSupplierDto } from '../dto/create-supplier.dto';
import { UpdateSupplierDto } from '../dto/update-supplier.dto';
import { ISupplier } from '../interfaces/supplier.interface';
import { Model } from "mongoose";


@Injectable()
export class SupplierService {
    constructor(@InjectModel('Supplier') private supplierModel: Model<ISupplier>) { }

    async createSupplier(createSupplierDto: CreateSupplierDto): Promise<ISupplier> {
        const newSupplier = await new this.supplierModel(createSupplierDto);
        return newSupplier.save();
    }

    async updateSupplier(supplierId: string, updateSupplierDto: UpdateSupplierDto): Promise<ISupplier> {
        const existingSupplier = await this.supplierModel.findByIdAndUpdate(supplierId, updateSupplierDto, { new: true });
        if (!existingSupplier) {
            throw new NotFoundException(`Supplier #${supplierId} not found`);
        }
        return existingSupplier;
    }

    async getAllSuppliers(): Promise<ISupplier[]> {
        const supplierData = await this.supplierModel.find();
        if (!supplierData || supplierData.length == 0) {
            throw new NotFoundException('Supplier data not found!');
        }
        return supplierData;
    }

    async getSupplier(supplierId: string): Promise<ISupplier> {
        const existingSupplier = await this.supplierModel.findById(supplierId).exec();
        if (!existingSupplier) {
            throw new NotFoundException(`Supplier #${supplierId} not found`);
        }
        return existingSupplier;
    }

    async deleteSupplier(supplierId: string): Promise<ISupplier> {
        const deletedSupplier = await this.supplierModel.findByIdAndDelete(supplierId);
        if (!deletedSupplier) {
            throw new NotFoundException(`Student #${supplierId} not found`);
        }
        return deletedSupplier;
    }
}