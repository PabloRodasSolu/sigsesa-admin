import { Oficina } from "../../domain/entities/oficina.entity";

export const OFICINA_REPOSITORY = Symbol("OFICINA_REPOSITORY");

export interface OficinaRepository {
  // Solo las oficinas a las que ese usuario tiene acceso (via
  // divisiones_usuario_oficinas) - nunca todas las oficinas del sistema.
  findAllForUser(userId: string): Promise<Oficina[]>;
}
