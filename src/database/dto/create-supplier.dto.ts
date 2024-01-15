import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength } from "class-validator";

export class CreateSupplierDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly supplierName: string;

    @IsString()
    @MaxLength(15)
    @IsNotEmpty()
    @IsPhoneNumber()
    readonly phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    products: string[];

    productCount: number;
}