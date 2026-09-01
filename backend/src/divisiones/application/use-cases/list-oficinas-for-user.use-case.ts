import { Inject, Injectable } from "@nestjs/common";
import { OFICINA_REPOSITORY, OficinaRepository } from "../ports/oficina-repository.port";
import { Oficina } from "../../domain/entities/oficina.entity";

@Injectable()
export class ListOficinasForUserUseCase {
  constructor(@Inject(OFICINA_REPOSITORY) private readonly oficinas: OficinaRepository) {}

  execute(userId: string): Promise<Oficina[]> {
    return this.oficinas.findAllForUser(userId);
  }
}
