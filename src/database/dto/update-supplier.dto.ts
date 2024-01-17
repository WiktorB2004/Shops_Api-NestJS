import { IsEmail, IsEmpty, IsPhoneNumber, IsString, MaxLength } from "class-validator";

export class UpdateSupplierDto {
    @IsEmpty()
    products: string[];

    @IsEmpty()
    productCount: number;
}