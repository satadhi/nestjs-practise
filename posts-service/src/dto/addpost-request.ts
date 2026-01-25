import { IsString, IsInt, MaxLength } from 'class-validator';

export class addPostRequest {
  @IsInt()
  id: string;

  @IsString()
  @MaxLength(1025)
  post: string;
}
