export const TOKEN_GENERATOR = Symbol("TOKEN_GENERATOR");

export interface GeneratedToken {
  raw: string;
  hash: string;
}

export interface TokenGenerator {
  generate(): GeneratedToken;
  hash(raw: string): string;
}
