import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreatePictureDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    url?: string;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    price: number;
}
