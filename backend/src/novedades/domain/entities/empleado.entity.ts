export class Empleado {
  constructor(
    public readonly id: string,
    public readonly codigo: string,
    public readonly nombre: string,
    public readonly estado: string,
    public readonly oficinaId: string | null,
    // Solo para mostrar en pantalla (mensajes de "ya asignado a X",
    // "se usa la oficina actual de X") - nunca se usa para decidir nada.
    public readonly oficinaName: string | null,
  ) {}
}
