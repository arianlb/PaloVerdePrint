import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    @IsInt()
    limit?: number;

    @IsOptional()
    @Min(0)
    @Type(() => Number)
    @IsInt()
    offset?: number;
}