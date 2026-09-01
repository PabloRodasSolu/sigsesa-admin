import { Cliente } from "../../domain/entities/cliente.entity";

export const CLIENTE_REPOSITORY = Symbol("CLIENTE_REPOSITORY");

export interface CreateClienteInput {
  codigo: string;
  nombre: string;
  nit: string | null;
  distritoId: number;
  createdByUserId: string;
}

export interface ClienteRepository {
  search(query: string): Promise<Cliente[]>;
  // Crea el cliente y, en la misma transaccion, la oficina que le corresponde
  // (cupo en 0 - lo sube la propia novedad de Incremento de puestos que
  // dispara esta alta, con la cantidad que ya se esta ingresando ahi mismo) y
  // le da acceso a esa oficina a quien lo esta creando - si no, la acaba de
  // crear y no podria ni verla en su propio selector de Oficina despues.
  create(input: CreateClienteInput): Promise<Cliente>;
}
