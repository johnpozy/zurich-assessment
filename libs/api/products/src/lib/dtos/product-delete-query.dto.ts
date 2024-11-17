import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ProductDeleteQueryDto {
  @ApiProperty()
  @IsString({ message: 'Product code must be a string' })
  @IsNotEmpty({ message: 'Product code is required' })
  productCode: string;
}
