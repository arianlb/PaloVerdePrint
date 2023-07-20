import { IsInt, IsNumber, Min, IsPositive } from "class-validator";

export class CreatePriceDto {
    @IsNumber()
    @Min(0)
    cost: number;

    @IsInt()
    @IsPositive()
    high: number;

    @IsInt()
    @IsPositive()
    width: number;
}