import { IsNotEmpty, IsString, MaxLength, IsMongoId, IsNumberString } from "class-validator";

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