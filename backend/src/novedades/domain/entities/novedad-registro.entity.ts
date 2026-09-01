export type NovedadEstado = "abierta" | "cerrada";

export class NovedadRegistro {
  constructor(
    public readonly id: string,
    public readonly tipoId: number,
    public readonly oficinaId: string,
    public readonly descripcion: string,
    public readonly estado: NovedadEstado,
    public readonly createdBy: string,
    public readonly createdAt: Date,
  ) {}
}
