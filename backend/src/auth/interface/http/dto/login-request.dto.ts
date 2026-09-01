import { IsBoolean, IsOptional, IsString, Length } from "class-validator";

export class LoginRequestDto {
  @IsString()
  @Length(3, 50)
  username!: string;

  @IsString()
  @Length(8, 200)
  password!: string;

  @IsOptional()
  @IsBoolean()
  rememberMe?: boolean;
}
