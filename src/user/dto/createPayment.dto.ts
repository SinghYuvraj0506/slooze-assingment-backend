import { IsString, Length, IsBoolean, IsOptional } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  @Length(4, 4, { message: 'Card last 4 digits must be exactly 4 characters' })
  cardLast4: string;

  @IsBoolean()
  isDefault: boolean;
}

export class UpdatePaymentMethodDto {
  @IsOptional()
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  @Length(4, 4, { message: 'Card last 4 digits must be exactly 4 characters' })
  cardLast4: string;

  @IsOptional()
  @IsBoolean()
  isDefault: boolean;
}
