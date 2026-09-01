import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { KYSELY } from "../../../../shared/database/db.module";
import { Database } from "../../../../shared/database/types";
import { Oficina } from "../../../domain/entities/oficina.entity";
import { OficinaRepository } from "../../../application/ports/oficina-repository.port";

@Injectable()
export class KyselyOficinaRepository implements OficinaRepository {
  constructor(@Inject(KYSELY) private readonly db: Kysely<Database>) {}

  async findAllForUser(userId: string): Promise<Oficina[]> {
    const rows = await this.db
      .selectFrom("divisiones_usuario_oficinas as uo")
      .innerJoin("divisiones_oficinas as o", "o.id", "uo.oficina_id")
      .innerJoin("divisiones_distritos as d", "d.id", "o.distrito_id")
      .select([
        "o.id as id",
        "o.code as code",
        "o.name as name",
        "d.id as distritoId",
        "d.name as distritoName",
        "o.cupo as cupo",
      ])
      .where("uo.user_id", "=", userId)
      .where("o.is_active", "=", true)
      .orderBy("d.name")
      .orderBy("o.name")
      .execute();

    return rows.map((r) => new Oficina(r.id, r.code, r.name, r.distritoId, r.distritoName, r.cupo));
  }
}
