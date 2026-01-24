import {
  IsArray,
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateOrderRequest {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsString({ each: true })
  itemNames: string[];
}
