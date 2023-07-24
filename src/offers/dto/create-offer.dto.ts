import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, } from "class-validator";

export class CreateOfferDto {
    @ApiProperty()
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty()
    @IsString()
    @MinLength(1)
    material: string;
}
