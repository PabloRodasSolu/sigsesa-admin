import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, IsUUID, Length, Min, ValidateNested } from "class-validator";

class ClienteAttachmentDto {
  @IsUUID("4")
  clienteId!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  cantidadPuestos?: number;
}

export class CreateNovedadRequestDto {
  @IsInt()
  tipoId!: number;

  @IsUUID("4")
  oficinaId!: string;

  @IsString()
  @Length(1, 5000)
  descripcion!: string;

  @IsOptional()
  @IsArray()
  @IsUUID("4", { each: true })
  empleadoIds?: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ClienteAttachmentDto)
  clientes?: ClienteAttachmentDto[];

  @IsOptional()
  @IsArray()
  @IsUUID("4", { each: true })
  vehiculoIds?: string[];
}
