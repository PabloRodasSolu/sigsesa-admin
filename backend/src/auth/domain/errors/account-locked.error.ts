export class AccountLockedError extends Error {
  constructor(public readonly lockedUntil: Date) {
    super("Cuenta bloqueada temporalmente");
  }
}
