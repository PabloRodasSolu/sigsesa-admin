import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { KYSELY } from "../../../../shared/database/db.module";
import { Database } from "../../../../shared/database/types";
import { Empleado } from "../../../domain/entities/empleado.entity";
import { EmpleadoRepository } from "../../../application/ports/empleado-repository.port";

@Injectable()
export class KyselyEmpleadoRepository implements EmpleadoRepository {
  constructor(@Inject(KYSELY) private readonly db: Kysely<Database>) {}

  async search(query: string, userId: string): Promise<Empleado[]> {
    let q = this.db
      .selectFrom("personal_empleados")
      .leftJoin("divisiones_oficinas", "divisiones_oficinas.id", "personal_empleados.oficina_id")
      .select([
        "personal_empleados.id",
        "personal_empleados.codigo",
        "personal_empleados.nombre",
        "personal_empleados.estado",
        "personal_empleados.oficina_id",
        "divisiones_oficinas.name as oficina_name",
      ])
      .where("personal_empleados.is_active", "=", true)
      // Solo empleados sin oficina asignada (disponibles para cualquiera) o
      // dentro de una oficina a la que este usuario tiene acceso - nunca de
      // otro distrito/oficina.
      .where((eb) =>
        eb.or([
          eb("personal_empleados.oficina_id", "is", null),
          eb(
            "personal_empleados.oficina_id",
            "in",
            eb
              .selectFrom("divisiones_usuario_oficinas")
              .select("oficina_id")
              .where("user_id", "=", userId),
          ),
        ]),
      );

    const term = query.trim();
    if (term) {
      const like = `%${term}%`;
      q = q.where((eb) => eb.or([eb("personal_empleados.codigo", "ilike", like), eb("personal_empleados.nombre", "ilike", like)]));
    }

    const rows = await q.orderBy("personal_empleados.nombre").limit(20).execute();
    return rows.map((r) => new Empleado(r.id, r.codigo, r.nombre, r.estado, r.oficina_id, r.oficina_name));
  }

  async findByIds(empleadoIds: string[]): Promise<Empleado[]> {
    if (empleadoIds.length === 0) return [];
    const rows = await this.db
      .selectFrom("personal_empleados")
      .leftJoin("divisiones_oficinas", "divisiones_oficinas.id", "personal_empleados.oficina_id")
      .select([
        "personal_empleados.id",
        "personal_empleados.codigo",
        "personal_empleados.nombre",
        "personal_empleados.estado",
        "personal_empleados.oficina_id",
        "divisiones_oficinas.name as oficina_name",
      ])
      .where("personal_empleados.id", "in", empleadoIds)
      .execute();
    return rows.map((r) => new Empleado(r.id, r.codigo, r.nombre, r.estado, r.oficina_id, r.oficina_name));
  }

  async updateEstado(empleadoId: string, estado: string): Promise<void> {
    await this.db.updateTable("personal_empleados").set({ estado }).where("id", "=", empleadoId).execute();
  }

  async assignOficina(empleadoId: string, oficinaId: string | null): Promise<void> {
    await this.db
      .updateTable("personal_empleados")
      .set({ oficina_id: oficinaId })
      .where("id", "=", empleadoId)
      .execute();
  }
}
