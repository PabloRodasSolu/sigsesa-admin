import { Vehiculo } from "../../domain/entities/vehiculo.entity";

export const VEHICULO_REPOSITORY = Symbol("VEHICULO_REPOSITORY");

export interface VehiculoRepository {
  search(query: string): Promise<Vehiculo[]>;
}
