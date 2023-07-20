import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreatePictureDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    link?: string;

    @IsNumber()
    @Min(0)
    price: number;
}
