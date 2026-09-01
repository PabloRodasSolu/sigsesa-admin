import { Inject, Injectable } from "@nestjs/common";
import { VEHICULO_REPOSITORY, VehiculoRepository } from "../ports/vehiculo-repository.port";
import { Vehiculo } from "../../domain/entities/vehiculo.entity";

@Injectable()
export class SearchVehiculosUseCase {
  constructor(@Inject(VEHICULO_REPOSITORY) private readonly vehiculos: VehiculoRepository) {}

  execute(query: string): Promise<Vehiculo[]> {
    return this.vehiculos.search(query);
  }
}
