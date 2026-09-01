// Coincide con la columna `selector` (CHECK) de novedades_tipos: le dice al
// frontend que modal abrir para este tipo.
export type NovedadSelector = "empleado" | "cliente_puestos" | "empleado_cliente_vehiculo" | "ninguno";

export class NovedadTipo {
  constructor(
    public readonly id: number,
    public readonly code: string,
    public readonly name: string,
    public readonly color: string,
    public readonly selector: NovedadSelector,
  ) {}
}
