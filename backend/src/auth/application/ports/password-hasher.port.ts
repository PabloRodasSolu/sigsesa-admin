export const PASSWORD_HASHER = Symbol("PASSWORD_HASHER");

export interface PasswordHasher {
  hash(plain: string): Promise<string>;
  verify(hash: string, plain: string): Promise<boolean>;
  // Hash valido y constante contra el que verificar cuando el usuario no existe -
  // sin esto, la rama "no existe" respondería mas rapido que la rama "contraseña
  // incorrecta" y delataría que usuarios existen por tiempo de respuesta.
  dummyHash(): string;
}
