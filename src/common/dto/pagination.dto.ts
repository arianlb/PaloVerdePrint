import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsPositive()
    limit?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(0)
    offset?: number;
}