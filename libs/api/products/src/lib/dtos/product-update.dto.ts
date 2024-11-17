import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ProductDto } from './product.dto';

export class ProductUpdateDto extends ProductDto {
  @IsNotEmpty({ message: 'Product code is required' })
  @IsString({ message: 'Product code must be a string' })
  productCode: string;

  @IsNotEmpty({ message: 'Product description is required' })
  @IsString({ message: 'Product description must be a string' })
  productDescription: string;

  @IsNotEmpty({ message: 'Location is required' })
  @IsString({ message: 'Location must be a string' })
  location: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  price: number;
}
