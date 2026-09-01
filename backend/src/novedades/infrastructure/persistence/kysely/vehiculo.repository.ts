import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { KYSELY } from "../../../../shared/database/db.module";
import { Database } from "../../../../shared/database/types";
import { Vehiculo } from "../../../domain/entities/vehiculo.entity";
import { VehiculoRepository } from "../../../application/ports/vehiculo-repository.port";

@Injectable()
export class KyselyVehiculoRepository implements VehiculoRepository {
  constructor(@Inject(KYSELY) private readonly db: Kysely<Database>) {}

  async search(query: string): Promise<Vehiculo[]> {
    let q = this.db.selectFrom("vehiculos").select(["id", "placa"]);

    const term = query.trim();
    if (term) {
      q = q.where("placa", "ilike", `%${term}%`);
    }

    const rows = await q.orderBy("placa").limit(20).execute();
    return rows.map((r) => new Vehiculo(r.id, r.placa));
  }
}
