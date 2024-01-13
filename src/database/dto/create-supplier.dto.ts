import { IsNotEmpty, IsNumberString, IsString, MaxLength } from "class-validator";

export class CreateSupplierDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    readonly supplierName: string;

    @IsString()
    @MaxLength(15)
    @IsNotEmpty()
    readonly phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    readonly email: string;

    readonly products: string[];

    @IsNumberString()
    readonly productCount: number;
}