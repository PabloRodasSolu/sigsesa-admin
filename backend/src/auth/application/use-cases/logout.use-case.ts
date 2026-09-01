import { Inject, Injectable } from "@nestjs/common";
import { SESSION_REPOSITORY, SessionRepository } from "../ports/session-repository.port";
import { TOKEN_GENERATOR, TokenGenerator } from "../ports/token-generator.port";

export interface LogoutInput {
  sessionTokenRaw: string;
}

@Injectable()
export class LogoutUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY) private readonly sessions: SessionRepository,
    @Inject(TOKEN_GENERATOR) private readonly tokens: TokenGenerator,
  ) {}

  async execute(input: LogoutInput): Promise<void> {
    const tokenHash = this.tokens.hash(input.sessionTokenRaw);
    const session = await this.sessions.findByTokenHash(tokenHash);
    if (!session) return; // token ya invalido/manipulado: nada que revocar, no es un error

    await this.sessions.revoke(session.id);
  }
}
