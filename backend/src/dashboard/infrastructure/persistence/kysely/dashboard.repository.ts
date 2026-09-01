import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { KYSELY } from "../../../../shared/database/db.module";
import { Database } from "../../../../shared/database/types";
import { DashboardRepository, ResumenGeneral } from "../../../application/ports/dashboard-repository.port";

@Injectable()
export class KyselyDashboardRepository implements DashboardRepository {
  constructor(@Inject(KYSELY) private readonly db: Kysely<Database>) {}

  async getResumenGeneral(): Promise<ResumenGeneral> {
    const clientesRow = await this.db
      .selectFrom("clientes")
      .select(({ fn }) => fn.countAll<number>().as("total"))
      .where("is_active", "=", true)
      .executeTakeFirstOrThrow();

    const empleadosRow = await this.db
      .selectFrom("personal_empleados")
      .select(({ fn }) => fn.countAll<number>().as("total"))
      .where("is_active", "=", true)
      .executeTakeFirstOrThrow();

    const distribucionRows = await this.db
      .selectFrom("personal_empleados")
      .select((eb) => ["estado", eb.fn.countAll<number>().as("cantidad")])
      .where("is_active", "=", true)
      .groupBy("estado")
      .execute();

    const cuposRows = await this.db
      .selectFrom("divisiones_oficinas as o")
      .innerJoin("divisiones_distritos as d", "d.id", "o.distrito_id")
      .select(["o.name as oficinaName", "d.name as distritoName", "o.cupo as cupo"])
      .where("o.is_active", "=", true)
      .orderBy("d.name")
      .orderBy("o.name")
      .execute();

    return {
      totalClientes: Number(clientesRow.total),
      personalOperativo: Number(empleadosRow.total),
      distribucionPorEstado: distribucionRows.map((r) => ({ estado: r.estado, cantidad: Number(r.cantidad) })),
      cupos: cuposRows,
    };
  }
}
