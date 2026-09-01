export class Session {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly tokenHash: string,
    public readonly expiresAt: Date,
    public readonly revokedAt: Date | null,
  ) {}

  isValid(now: Date): boolean {
    return this.revokedAt === null && this.expiresAt > now;
  }
}
