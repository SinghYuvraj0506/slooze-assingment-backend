import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CheckoutOrderDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  paymentMethodId: string;
}
