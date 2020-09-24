import { ApiPropertyOptional } from '@nestjs/swagger';

export class BaseDto {
  @ApiPropertyOptional({
    description: `Creation date`,
    example: new Date().toISOString()
  })
  createdAt: Date;

  @ApiPropertyOptional({
    description: `Update date`,
    example: new Date().toISOString()
  })
  updatedAt: Date;

  @ApiPropertyOptional({
    description: `Wheter the object is active or not`,
    example: true
  })
  active: boolean;
}