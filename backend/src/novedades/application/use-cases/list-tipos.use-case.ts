import { Inject, Injectable } from "@nestjs/common";
import { NOVEDAD_TIPO_REPOSITORY, NovedadTipoRepository } from "../ports/novedad-tipo-repository.port";
import { NovedadTipo } from "../../domain/entities/novedad-tipo.entity";

@Injectable()
export class ListTiposUseCase {
  constructor(@Inject(NOVEDAD_TIPO_REPOSITORY) private readonly tipos: NovedadTipoRepository) {}

  execute(): Promise<NovedadTipo[]> {
    return this.tipos.findAll();
  }
}
