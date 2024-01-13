import { IsNotEmpty, IsString, MaxLength, IsMongoId, Min, IsNumber, IsNumberString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @MaxLength(32)
    @IsNotEmpty()
    readonly productName: string;

    @IsMongoId()
    @IsString()
    @IsNotEmpty()
    readonly supplierId: string;

    @IsNumberString()
    readonly price: number;
}