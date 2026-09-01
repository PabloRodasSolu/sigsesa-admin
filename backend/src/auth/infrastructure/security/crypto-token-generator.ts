import { Injectable } from "@nestjs/common";
import { randomBytes, createHash } from "node:crypto";
import { GeneratedToken, TokenGenerator } from "../../application/ports/token-generator.port";

@Injectable()
export class CryptoTokenGenerator implements TokenGenerator {
  generate(): GeneratedToken {
    const raw = randomBytes(32).toString("base64url");
    return { raw, hash: this.hash(raw) };
  }

  hash(raw: string): string {
    // SHA-256 alcanza aqui: el token ya es aleatorio de alta entropia, no una
    // contraseña elegida por una persona - no hace falta un hash lento como argon2.
    return createHash("sha256").update(raw).digest("hex");
  }
}
