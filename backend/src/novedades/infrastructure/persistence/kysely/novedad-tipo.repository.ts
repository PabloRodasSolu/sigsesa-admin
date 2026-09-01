import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { KYSELY } from "../../../../shared/database/db.module";
import { Database } from "../../../../shared/database/types";
import { NovedadTipo, NovedadSelector } from "../../../domain/entities/novedad-tipo.entity";
import { NovedadTipoRepository } from "../../../application/ports/novedad-tipo-repository.port";

function toTipo(row: { id: number; code: string; name: string; color: string; selector: string }): NovedadTipo {
  return new NovedadTipo(row.id, row.code, row.name, row.color, row.selector as NovedadSelector);
}

@Injectable()
export class KyselyNovedadTipoRepository implements NovedadTipoRepository {
  constructor(@Inject(KYSELY) private readonly db: Kysely<Database>) {}

  async findAll(): Promise<NovedadTipo[]> {
    const rows = await this.db.selectFrom("novedades_tipos").selectAll().orderBy("id").execute();
    return rows.map(toTipo);
  }

  async findById(id: number): Promise<NovedadTipo | null> {
    const row = await this.db.selectFrom("novedades_tipos").selectAll().where("id", "=", id).executeTakeFirst();
    return row ? toTipo(row) : null;
  }
}
