import { Inject, Injectable } from "@nestjs/common";
import { Kysely, sql } from "kysely";
import { KYSELY } from "../../../../shared/database/db.module";
import { Database } from "../../../../shared/database/types";
import { NovedadRegistro, NovedadEstado } from "../../../domain/entities/novedad-registro.entity";
import {
  ClienteAttachment,
  CreateNovedadRegistroInput,
  NovedadRegistroDetallado,
  NovedadRegistroRepository,
} from "../../../application/ports/novedad-registro-repository.port";

@Injectable()
export class KyselyNovedadRegistroRepository implements NovedadRegistroRepository {
  constructor(@Inject(KYSELY) private readonly db: Kysely<Database>) {}

  async create(input: CreateNovedadRegistroInput): Promise<NovedadRegistro> {
    const row = await this.db
      .insertInto("novedades_registros")
      .values({
        tipo_id: input.tipoId,
        oficina_id: input.oficinaId,
        descripcion: input.descripcion,
        created_by: input.createdBy,
      })
      .returning(["id", "tipo_id", "oficina_id", "descripcion", "estado", "created_by", "created_at"])
      .executeTakeFirstOrThrow();

    return new NovedadRegistro(
      row.id,
      row.tipo_id,
      row.oficina_id,
      row.descripcion,
      row.estado as NovedadEstado,
      row.created_by,
      row.created_at,
    );
  }

  async attachEmpleados(novedadId: string, empleadoIds: string[]): Promise<void> {
    if (empleadoIds.length === 0) return;
    await this.db
      .insertInto("novedades_empleados")
      .values(empleadoIds.map((empleadoId) => ({ novedad_id: novedadId, empleado_id: empleadoId })))
      .execute();
  }

  async attachClientes(novedadId: string, entries: ClienteAttachment[]): Promise<void> {
    if (entries.length === 0) return;
    await this.db
      .insertInto("novedades_clientes")
      .values(
        entries.map((e) => ({
          novedad_id: novedadId,
          cliente_id: e.clienteId,
          cantidad_puestos: e.cantidadPuestos,
        })),
      )
      .execute();
  }

  async attachVehiculos(novedadId: string, vehiculoIds: string[]): Promise<void> {
    if (vehiculoIds.length === 0) return;
    await this.db
      .insertInto("novedades_vehiculos")
      .values(vehiculoIds.map((vehiculoId) => ({ novedad_id: novedadId, vehiculo_id: vehiculoId })))
      .execute();
  }

  async listByDate(userId: string, fecha: string): Promise<NovedadRegistroDetallado[]> {
    // 3 LEFT JOIN, uno por tipo de adjunto - nunca se duplica una fila porque
    // el frontend solo deja elegir UN empleado/cliente/vehiculo por novedad,
    // asi que a lo sumo uno de los tres queda no-nulo. `fecha` va parametrizado
    // (bind param de Kysely, no interpolacion de string) y se valida su formato
    // antes de llegar aqui (ver esFechaValida) - nunca SQL crudo con input.
    return this.db
      .selectFrom("novedades_registros as r")
      .innerJoin("novedades_tipos as t", "t.id", "r.tipo_id")
      .innerJoin("auth_users as u", "u.id", "r.created_by")
      .innerJoin("divisiones_oficinas as o", "o.id", "r.oficina_id")
      .innerJoin("divisiones_distritos as d", "d.id", "o.distrito_id")
      .leftJoin("novedades_empleados as ne", "ne.novedad_id", "r.id")
      .leftJoin("personal_empleados as pe", "pe.id", "ne.empleado_id")
      .leftJoin("novedades_clientes as nc", "nc.novedad_id", "r.id")
      .leftJoin("clientes as c", "c.id", "nc.cliente_id")
      .leftJoin("novedades_vehiculos as nv", "nv.novedad_id", "r.id")
      .leftJoin("vehiculos as v", "v.id", "nv.vehiculo_id")
      .select([
        "r.id as id",
        "t.code as tipoCode",
        "t.name as tipoName",
        "t.color as tipoColor",
        "o.name as oficinaName",
        "d.name as distritoName",
        "r.descripcion as descripcion",
        "r.estado as estado",
        "u.display_name as createdByName",
        "r.created_at as createdAt",
        "pe.nombre as empleadoNombre",
        "c.nombre as clienteNombre",
        "v.placa as vehiculoPlaca",
      ])
      .where((eb) =>
        eb(
          "r.oficina_id",
          "in",
          eb.selectFrom("divisiones_usuario_oficinas").select("oficina_id").where("user_id", "=", userId),
        ),
      )
      .where("r.created_at", ">=", sql<Date>`${fecha}::date`)
      .where("r.created_at", "<", sql<Date>`${fecha}::date + interval '1 day'`)
      .orderBy("r.created_at", "desc")
      .execute();
  }
}
