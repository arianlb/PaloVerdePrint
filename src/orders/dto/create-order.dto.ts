import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsIn, IsMongoId, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateOrderDto {
    @ApiProperty()
    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    image: string;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    paid: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsIn(['Pending', 'Accepted', 'Rejected', 'Ready', 'Delivered'])
    status?: string;

    @ApiProperty()
    @IsMongoId()
    offer: string;
}
