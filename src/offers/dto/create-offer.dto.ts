import { IsArray, IsOptional, IsString, MinLength, } from "class-validator";

export class CreateOfferDto {
    @IsString()
    @MinLength(1)
    title: string;

    @IsString()
    @MinLength(1)
    material: string;
}
