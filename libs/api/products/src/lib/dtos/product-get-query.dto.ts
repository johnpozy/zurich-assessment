import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class ProductGetQueryDto {
  @ApiPropertyOptional()
  @IsString({ message: 'Product code must be a string' })
  @IsOptional()
  productCode?: string;

  @ApiPropertyOptional()
  @IsString({ message: 'Location must be a string' })
  @IsOptional()
  location?: string;
}
