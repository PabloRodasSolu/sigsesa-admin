import { Controller, Get, Inject } from "@nestjs/common";
import { Kysely, sql } from "kysely";
import { KYSELY } from "./shared/database/db.module";
import { Database } from "./shared/database/types";

@Controller()
export class AppController {
  constructor(@Inject(KYSELY) private readonly db: Kysely<Database>) {}

  // Prueba real de que Nest esta conectado a Postgres - no un mock, una consulta real
  // contra la tabla que creaste a mano.
  @Get("health")
  async health() {
    const roles = await this.db
      .selectFrom("auth_roles")
      .select(({ fn }) => fn.countAll<number>().as("total"))
      .executeTakeFirstOrThrow();

    const version = await sql<{ version: string }>`select version()`.execute(this.db);

    return {
      ok: true,
      database: "sigsesa",
      auth_roles_count: Number(roles.total),
      postgres_version: version.rows[0]?.version,
    };
  }
}
