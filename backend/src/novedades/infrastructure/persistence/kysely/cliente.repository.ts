import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { KYSELY } from "../../../../shared/database/db.module";
import { Database } from "../../../../shared/database/types";
import { Cliente } from "../../../domain/entities/cliente.entity";
import { ClienteRepository, CreateClienteInput } from "../../../application/ports/cliente-repository.port";

@Injectable()
export class KyselyClienteRepository implements ClienteRepository {
  constructor(@Inject(KYSELY) private readonly db: Kysely<Database>) {}

  async search(query: string): Promise<Cliente[]> {
    // LEFT JOIN, no INNER: clientes viejos sembrados antes de que existiera la
    // relacion cliente<->oficina no deben desaparecer de la busqueda, solo
    // traer oficina_id en null.
    let q = this.db
      .selectFrom("clientes")
      .leftJoin("divisiones_oficinas", "divisiones_oficinas.cliente_id", "clientes.id")
      .select(["clientes.id", "clientes.codigo", "clientes.nombre", "divisiones_oficinas.id as oficina_id"])
      .where("clientes.is_active", "=", true);

    const term = query.trim();
    if (term) {
      const like = `%${term}%`;
      q = q.where((eb) => eb.or([eb("clientes.codigo", "ilike", like), eb("clientes.nombre", "ilike", like)]));
    }

    const rows = await q.orderBy("clientes.nombre").limit(20).execute();
    return rows.map((r) => new Cliente(r.id, r.codigo, r.nombre, r.oficina_id));
  }

  async create(input: CreateClienteInput): Promise<Cliente> {
    // Transaccion: si la oficina no se pudiera crear, el cliente tampoco debe
    // quedar creado (y viceversa) - las dos filas nacen juntas o no nace ninguna.
    return this.db.transaction().execute(async (trx) => {
      const cliente = await trx
        .insertInto("clientes")
        .values({ codigo: input.codigo, nombre: input.nombre, nit: input.nit })
        .returning(["id", "codigo", "nombre"])
        .executeTakeFirstOrThrow();

      const oficina = await trx
        .insertInto("divisiones_oficinas")
        .values({
          distrito_id: input.distritoId,
          code: input.codigo,
          name: input.nombre,
          cliente_id: cliente.id,
        })
        .returning("id")
        .executeTakeFirstOrThrow();

      await trx
        .insertInto("divisiones_usuario_oficinas")
        .values({ user_id: input.createdByUserId, oficina_id: oficina.id })
        .execute();

      return new Cliente(cliente.id, cliente.codigo, cliente.nombre, oficina.id);
    });
  }
}
