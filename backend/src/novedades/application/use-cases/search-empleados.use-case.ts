import { Inject, Injectable } from "@nestjs/common";
import { EMPLEADO_REPOSITORY, EmpleadoRepository } from "../ports/empleado-repository.port";
import { Empleado } from "../../domain/entities/empleado.entity";

@Injectable()
export class SearchEmpleadosUseCase {
  constructor(@Inject(EMPLEADO_REPOSITORY) private readonly empleados: EmpleadoRepository) {}

  execute(query: string, userId: string): Promise<Empleado[]> {
    return this.empleados.search(query, userId);
  }
}
