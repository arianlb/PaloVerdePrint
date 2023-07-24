import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, Min, IsPositive } from "class-validator";

export class CreatePriceDto {
    @ApiProperty()
    @IsNumber()
    @Min(0)
    value: number;

    @ApiProperty()
    @IsInt()
    @IsPositive()
    high: number;

    @ApiProperty()
    @IsInt()
    @IsPositive()
    width: number;
}