// Mismo mensaje publico que InvalidCredentialsError a proposito (anti-enumeracion) -
// se distingue como clase aparte solo para que el use case pueda loguear
// "account_disabled" en auth_login_attempts en vez de "bad_password".
export class AccountDisabledError extends Error {
  constructor() {
    super("Usuario o contraseña incorrectos");
  }
}
