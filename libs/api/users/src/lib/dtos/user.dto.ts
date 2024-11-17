import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiHideProperty()
  @Exclude()
  password: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  @IsOptional()
  accessToken?: string;
}
