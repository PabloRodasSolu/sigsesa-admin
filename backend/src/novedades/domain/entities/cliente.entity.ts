export class Cliente {
  constructor(
    public readonly id: string,
    public readonly codigo: string,
    public readonly nombre: string,
    // null solo puede pasar con clientes viejos sembrados antes de que
    // existiera esta relacion - un cliente creado por el sistema siempre
    // trae su propia oficina.
    public readonly oficinaId: string | null,
  ) {}
}
