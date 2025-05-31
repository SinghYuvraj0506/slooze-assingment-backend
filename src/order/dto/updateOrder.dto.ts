import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdatePaymentDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  paymentMethodId: string;
}
