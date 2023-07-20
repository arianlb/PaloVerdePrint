import { IsDate, IsIn, IsMongoId, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateOrderDto {
    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsString()
    @MinLength(1)
    image: string;

    @IsNumber()
    @Min(0)
    paid: number;

    @IsOptional()
    @IsString()
    @IsIn(['Pending', 'Accepted', 'Rejected', 'Ready', 'Delivered'])
    status?: string;

    @IsMongoId()
    offer: string;
}
