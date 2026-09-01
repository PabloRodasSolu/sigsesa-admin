import { NovedadTipo } from "../../domain/entities/novedad-tipo.entity";

export const NOVEDAD_TIPO_REPOSITORY = Symbol("NOVEDAD_TIPO_REPOSITORY");

export interface NovedadTipoRepository {
  findAll(): Promise<NovedadTipo[]>;
  findById(id: number): Promise<NovedadTipo | null>;
}
