import { IsOptional, IsString, Length } from "class-validator";

export class CreateClienteRequestDto {
  @IsString()
  @Length(1, 20)
  codigo!: string;

  @IsString()
  @Length(1, 150)
  nombre!: string;

  @IsOptional()
  @IsString()
  @Length(1, 20)
  nit?: string;
}
