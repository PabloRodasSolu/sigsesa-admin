export class User {
  constructor(
    public readonly id: string,
    public readonly usernameNormalized: string,
    public readonly displayName: string,
    public readonly passwordHash: string,
    public readonly roleId: number,
    public readonly distritoId: number | null,
    public readonly isActive: boolean,
    public readonly failedLoginAttempts: number,
    public readonly lockedUntil: Date | null,
  ) {}

  isLocked(now: Date): boolean {
    return this.lockedUntil !== null && this.lockedUntil > now;
  }
}
