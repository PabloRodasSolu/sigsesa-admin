import { Injectable } from "@nestjs/common";
import * as argon2 from "argon2";
import { PasswordHasher } from "../../application/ports/password-hasher.port";

// Parametros conservadores para un login interno de baja frecuencia (~250-500ms por
// verificacion es aceptable aqui, a diferencia de un sitio de alto trafico).
const ARGON2_OPTIONS: argon2.Options = {
  type: argon2.argon2id,
  memoryCost: 19456, // ~19 MB
  timeCost: 2,
  parallelism: 1,
};

// Hash precomputado de una contraseña que nadie va a usar, con los mismos parametros
// que ARGON2_OPTIONS - generado una sola vez, no se recalcula en cada arranque.
const DUMMY_HASH =
  "$argon2id$v=19$m=19456,t=2,p=1$DupX1iAtIpRMTSREK83IoQ$dFtLNwpN68HsRwB4jNaOn2fMvIrxVrX1NyayAMnDdbs";

@Injectable()
export class Argon2PasswordHasher implements PasswordHasher {
  hash(plain: string): Promise<string> {
    return argon2.hash(plain, ARGON2_OPTIONS);
  }

  verify(hash: string, plain: string): Promise<boolean> {
    return argon2.verify(hash, plain);
  }

  dummyHash(): string {
    return DUMMY_HASH;
  }
}
