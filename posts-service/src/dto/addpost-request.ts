import { IsString, IsInt, MaxLength } from 'class-validator';

export class addPostRequest {
  @IsInt()
  id: number;

  @IsString()
  @MaxLength(1025)
  content: string;

  @IsString()
  @MaxLength(15)
  title: string;
}
