import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { KYSELY } from "../../../../shared/database/db.module";
import { Database } from "../../../../shared/database/types";
import { OficinaCupoRepository } from "../../../application/ports/oficina-cupo-repository.port";

@Injectable()
export class KyselyOficinaCupoRepository implements OficinaCupoRepository {
  constructor(@Inject(KYSELY) private readonly db: Kysely<Database>) {}

  async adjustCupoForEmpleado(empleadoId: string, delta: number): Promise<void> {
    // Subconsulta en el WHERE en vez de leer primero y escribir despues - un
    // solo viaje a la base, atomico. Si el empleado no tiene oficina asignada
    // (oficina_id NULL), la subconsulta devuelve NULL y el UPDATE no toca nada.
    await this.db
      .updateTable("divisiones_oficinas")
      .set((eb) => ({ cupo: eb("cupo", "+", delta) }))
      .where((eb) =>
        eb(
          "id",
          "=",
          eb.selectFrom("personal_empleados").select("oficina_id").where("id", "=", empleadoId),
        ),
      )
      .execute();
  }

  async adjustCupoForCliente(clienteId: string, delta: number): Promise<void> {
    await this.db
      .updateTable("divisiones_oficinas")
      .set((eb) => ({ cupo: eb("cupo", "+", delta) }))
      .where("cliente_id", "=", clienteId)
      .execute();
  }
}
