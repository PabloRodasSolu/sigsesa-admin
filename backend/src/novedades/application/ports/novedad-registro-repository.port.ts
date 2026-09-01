import { NovedadRegistro } from "../../domain/entities/novedad-registro.entity";

export const NOVEDAD_REGISTRO_REPOSITORY = Symbol("NOVEDAD_REGISTRO_REPOSITORY");

export interface CreateNovedadRegistroInput {
  tipoId: number;
  oficinaId: string;
  descripcion: string;
  createdBy: string;
}

export interface ClienteAttachment {
  clienteId: string;
  cantidadPuestos: number | null;
}

// Fila ya "enriquecida" de una novedad: trae el nombre/color del tipo, la
// oficina y el distrito, quien la registro, y a quien aplica (a lo sumo uno
// de los 3 esta lleno hoy, porque el frontend solo deja elegir un
// empleado/cliente/vehiculo por novedad). Una sola forma para las 3 vistas
// que necesitan lo mismo: el log del dia en la pagina de Novedades, el
// historial de dias anteriores, y el reporte Excel.
export interface NovedadRegistroDetallado {
  id: string;
  tipoCode: string;
  tipoName: string;
  tipoColor: string;
  oficinaName: string;
  distritoName: string;
  descripcion: string;
  estado: string;
  createdByName: string;
  createdAt: Date;
  empleadoNombre: string | null;
  clienteNombre: string | null;
  vehiculoPlaca: string | null;
}

export interface NovedadRegistroRepository {
  create(input: CreateNovedadRegistroInput): Promise<NovedadRegistro>;
  attachEmpleados(novedadId: string, empleadoIds: string[]): Promise<void>;
  attachClientes(novedadId: string, entries: ClienteAttachment[]): Promise<void>;
  attachVehiculos(novedadId: string, vehiculoIds: string[]): Promise<void>;
  // Solo las oficinas a las que userId tiene acceso - mismo criterio de
  // aislamiento que el resto del modulo. `fecha` en formato YYYY-MM-DD; se usa
  // tanto para "hoy" (el log en vivo) como para cualquier dia anterior
  // (historial / reporte Excel de ese dia).
  listByDate(userId: string, fecha: string): Promise<NovedadRegistroDetallado[]>;
}
