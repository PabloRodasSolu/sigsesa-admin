import { Inject, Injectable } from "@nestjs/common";
import { NOVEDAD_TIPO_REPOSITORY, NovedadTipoRepository } from "../ports/novedad-tipo-repository.port";
import { NOVEDAD_REGISTRO_REPOSITORY, NovedadRegistroRepository } from "../ports/novedad-registro-repository.port";
import { EMPLEADO_REPOSITORY, EmpleadoRepository } from "../ports/empleado-repository.port";
import { OFICINA_CUPO_REPOSITORY, OficinaCupoRepository } from "../ports/oficina-cupo-repository.port";
import { NovedadRegistro } from "../../domain/entities/novedad-registro.entity";

export interface CreateNovedadInput {
  tipoId: number;
  oficinaId: string;
  descripcion: string;
  createdBy: string;
  empleadoIds?: string[];
  clientes?: { clienteId: string; cantidadPuestos?: number }[];
  vehiculoIds?: string[];
}

export interface CreateNovedadSuccess {
  outcome: "created";
  registro: NovedadRegistro;
}

export interface CreateNovedadInvalid {
  outcome: "invalid";
  message: string;
}

export type CreateNovedadResult = CreateNovedadSuccess | CreateNovedadInvalid;

// A que estado pasa el empleado segun el tipo de novedad que se le aplica -
// los tipos que no aparecen aqui (Incremento puestos, Supervisiones, y los 4
// de puro texto) no le cambian el estado a nadie.
const ESTADO_POR_TIPO: Record<string, string> = {
  altas: "no_disponible",
  bajas: "baja",
  permisos: "ausente",
  vacaciones: "ausente",
  faltando: "ausente",
};

// Bajas/permisos/vacaciones/faltando actuan sobre la oficina ACTUAL del
// empleado (no reasignan nada) - por eso exigen que ya este asignado a una.
const REQUIERE_OFICINA_ACTUAL = new Set(["bajas", "permisos", "vacaciones", "faltando"]);

@Injectable()
export class CreateNovedadUseCase {
  constructor(
    @Inject(NOVEDAD_TIPO_REPOSITORY) private readonly tipos: NovedadTipoRepository,
    @Inject(NOVEDAD_REGISTRO_REPOSITORY) private readonly registros: NovedadRegistroRepository,
    @Inject(EMPLEADO_REPOSITORY) private readonly empleados: EmpleadoRepository,
    @Inject(OFICINA_CUPO_REPOSITORY) private readonly oficinaCupo: OficinaCupoRepository,
  ) {}

  async execute(input: CreateNovedadInput): Promise<CreateNovedadResult> {
    const tipo = await this.tipos.findById(input.tipoId);
    if (!tipo) {
      return { outcome: "invalid", message: "El tipo de novedad no existe" };
    }

    // Cada tipo exige adjuntar lo que su `selector` indica - esto es lo que evita
    // que, por ejemplo, se registre un "Alta" sin decir a que empleado aplica.
    const tieneEmpleados = (input.empleadoIds?.length ?? 0) > 0;
    const tieneClientes = (input.clientes?.length ?? 0) > 0;
    const tieneVehiculos = (input.vehiculoIds?.length ?? 0) > 0;

    if (tipo.selector === "empleado" && !tieneEmpleados) {
      return { outcome: "invalid", message: `${tipo.name} requiere seleccionar al menos un empleado` };
    }
    if (tipo.selector === "cliente_puestos" && !tieneClientes) {
      return { outcome: "invalid", message: `${tipo.name} requiere seleccionar un cliente` };
    }
    if (tipo.selector === "empleado_cliente_vehiculo" && !tieneEmpleados && !tieneClientes && !tieneVehiculos) {
      return { outcome: "invalid", message: `${tipo.name} requiere seleccionar un empleado, cliente o vehículo` };
    }

    // Reglas de negocio sobre el estado ACTUAL del empleado - se validan antes
    // de escribir nada, para no dejar un registro creado si algo no cuadra.
    if (tieneEmpleados) {
      const actuales = await this.empleados.findByIds(input.empleadoIds!);

      if (tipo.code === "altas") {
        // No puede estar de alta en dos oficinas/empresas a la vez - si ya
        // tiene oficina asignada (incluye "ausente": sigue perteneciendo a
        // esa oficina aunque este de permiso/vacaciones), se rechaza.
        const yaAsignado = actuales.find((e) => e.oficinaId !== null);
        if (yaAsignado) {
          return {
            outcome: "invalid",
            message: `${yaAsignado.nombre} ya está asignado a ${yaAsignado.oficinaName ?? "otra oficina"}. Debe darlo de baja antes de asignarlo a una oficina nueva.`,
          };
        }
      } else if (REQUIERE_OFICINA_ACTUAL.has(tipo.code)) {
        // Bajas/permisos/vacaciones/faltando no tienen sentido sobre alguien
        // que no esta asignado a ninguna oficina todavia.
        const sinOficina = actuales.find((e) => e.oficinaId === null);
        if (sinOficina) {
          return {
            outcome: "invalid",
            message: `${sinOficina.nombre} no está asignado a ninguna oficina actualmente, no se puede registrar ${tipo.name.toLowerCase()}.`,
          };
        }
      }
    }

    const registro = await this.registros.create({
      tipoId: input.tipoId,
      oficinaId: input.oficinaId,
      descripcion: input.descripcion,
      createdBy: input.createdBy,
    });

    if (tieneEmpleados) {
      await this.registros.attachEmpleados(registro.id, input.empleadoIds!);
      await this.aplicarEfectosEmpleado(tipo.code, input.empleadoIds!, input.oficinaId);
    }
    if (tieneClientes) {
      await this.registros.attachClientes(
        registro.id,
        input.clientes!.map((c) => ({ clienteId: c.clienteId, cantidadPuestos: c.cantidadPuestos ?? null })),
      );
      if (tipo.code === "incremento_puestos") {
        await Promise.all(
          input.clientes!.map((c) => this.oficinaCupo.adjustCupoForCliente(c.clienteId, c.cantidadPuestos ?? 0)),
        );
      }
    }
    if (tieneVehiculos) {
      await this.registros.attachVehiculos(registro.id, input.vehiculoIds!);
    }

    return { outcome: "created", registro };
  }

  // Estado, oficina y cupo se mueven distinto segun el tipo - por eso van
  // ramificados aqui en vez de en una sola tabla generica. El orden dentro de
  // cada rama importa: assignOficina cambia lo que la subconsulta de
  // adjustCupoForEmpleado va a leer despues.
  private async aplicarEfectosEmpleado(tipoCode: string, empleadoIds: string[], oficinaFormulario: string): Promise<void> {
    const nuevoEstado = ESTADO_POR_TIPO[tipoCode];
    if (nuevoEstado) {
      await Promise.all(empleadoIds.map((id) => this.empleados.updateEstado(id, nuevoEstado)));
    }

    if (tipoCode === "altas") {
      // Primero se asigna la oficina nueva, y el cupo que baja es el de esa
      // oficina nueva (por eso el ajuste va DESPUES del assign).
      await Promise.all(
        empleadoIds.map(async (id) => {
          await this.empleados.assignOficina(id, oficinaFormulario);
          await this.oficinaCupo.adjustCupoForEmpleado(id, -1);
        }),
      );
    } else if (tipoCode === "bajas") {
      // Al reves: el cupo que sube es el de la oficina ACTUAL del empleado,
      // asi que se ajusta antes de desasignarlo.
      await Promise.all(
        empleadoIds.map(async (id) => {
          await this.oficinaCupo.adjustCupoForEmpleado(id, 1);
          await this.empleados.assignOficina(id, null);
        }),
      );
    } else if (tipoCode === "permisos" || tipoCode === "vacaciones" || tipoCode === "faltando") {
      // Ausencia temporal: no cambia la oficina del empleado, solo dice que
      // ese puesto queda sin cubrir mientras tanto.
      await Promise.all(empleadoIds.map((id) => this.oficinaCupo.adjustCupoForEmpleado(id, -1)));
    }
  }
}
