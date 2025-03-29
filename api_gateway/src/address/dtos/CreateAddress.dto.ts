import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  county: string;

  @IsNotEmpty()
  @IsString()
  subCounty: string;

  @IsNotEmpty()
  @IsString()
  physicalAddress: string;

  @IsOptional()
  @IsString()
  box?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;
}
