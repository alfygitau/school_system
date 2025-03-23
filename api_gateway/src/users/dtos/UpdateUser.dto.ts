import { IsEmail, IsNotEmpty } from "class-validator";

export class UpdateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  mobileNumber: string;

  @IsNotEmpty()
  password: string;

  address?: string;
}
