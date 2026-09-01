import { Empleado } from "../../domain/entities/empleado.entity";

export const EMPLEADO_REPOSITORY = Symbol("EMPLEADO_REPOSITORY");

export interface EmpleadoRepository {
  // Solo empleados dentro de las oficinas a las que userId tiene acceso, mas
  // los que no tienen ninguna oficina asignada todavia (quedan "Disponibles"
  // para cualquiera). Nunca se listan empleados de otro distrito/oficina.
  search(query: string, userId: string): Promise<Empleado[]>;
  // Sin escopar por usuario a proposito - se usa para validar reglas de
  // negocio (p.ej. "ya esta asignado a otra oficina") justo antes de crear
  // una novedad, no para mostrar datos en un listado.
  findByIds(empleadoIds: string[]): Promise<Empleado[]>;
  updateEstado(empleadoId: string, estado: string): Promise<void>;
  // null para desasignar (Baja); un id real para asignar (Alta).
  assignOficina(empleadoId: string, oficinaId: string | null): Promise<void>;
}
