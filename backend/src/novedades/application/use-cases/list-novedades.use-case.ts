import { Inject, Injectable } from "@nestjs/common";
import {
  NOVEDAD_REGISTRO_REPOSITORY,
  NovedadRegistroDetallado,
  NovedadRegistroRepository,
} from "../ports/novedad-registro-repository.port";
import { fechaDeHoy } from "../util/fecha.util";

@Injectable()
export class ListNovedadesUseCase {
  constructor(@Inject(NOVEDAD_REGISTRO_REPOSITORY) private readonly registros: NovedadRegistroRepository) {}

  // Sin `fecha`: el log en vivo, siempre hoy - amanece limpio cada dia porque
  // solo muestra lo de la fecha actual, nunca arrastra dias anteriores. Con
  // `fecha`: el historial, para cualquier dia pasado.
  execute(userId: string, fecha?: string): Promise<NovedadRegistroDetallado[]> {
    return this.registros.listByDate(userId, fecha ?? fechaDeHoy());
  }
}
