export class Oficina {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly name: string,
    public readonly distritoId: number,
    public readonly distritoName: string,
    public readonly cupo: number,
  ) {}
}
