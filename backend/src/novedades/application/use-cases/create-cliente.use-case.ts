import { Inject, Injectable } from "@nestjs/common";
import { CLIENTE_REPOSITORY, ClienteRepository } from "../ports/cliente-repository.port";
import { Cliente } from "../../domain/entities/cliente.entity";

export interface CreateClienteInput {
  codigo: string;
  nombre: string;
  nit?: string;
  distritoId: number;
  createdByUserId: string;
}

@Injectable()
export class CreateClienteUseCase {
  constructor(@Inject(CLIENTE_REPOSITORY) private readonly clientes: ClienteRepository) {}

  execute(input: CreateClienteInput): Promise<Cliente> {
    return this.clientes.create({
      codigo: input.codigo,
      nombre: input.nombre,
      nit: input.nit ?? null,
      distritoId: input.distritoId,
      createdByUserId: input.createdByUserId,
    });
  }
}
