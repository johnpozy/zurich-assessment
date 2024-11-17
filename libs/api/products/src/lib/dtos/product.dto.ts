import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty()
  productCode: string;

  @ApiProperty()
  productDescription: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  price: number;
}
