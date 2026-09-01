export class InvalidCredentialsError extends Error {
  constructor() {
    super("Usuario o contraseña incorrectos");
  }
}
