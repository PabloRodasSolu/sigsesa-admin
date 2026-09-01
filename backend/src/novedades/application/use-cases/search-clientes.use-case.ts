import { Inject, Injectable } from "@nestjs/common";
import { CLIENTE_REPOSITORY, ClienteRepository } from "../ports/cliente-repository.port";
import { Cliente } from "../../domain/entities/cliente.entity";

@Injectable()
export class SearchClientesUseCase {
  constructor(@Inject(CLIENTE_REPOSITORY) private readonly clientes: ClienteRepository) {}

  execute(query: string): Promise<Cliente[]> {
    return this.clientes.search(query);
  }
}
