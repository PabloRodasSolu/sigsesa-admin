import { Inject, Injectable } from "@nestjs/common";
import { SESSION_REPOSITORY, SessionRepository } from "../ports/session-repository.port";
import { USER_REPOSITORY, UserRepository } from "../ports/user-repository.port";
import { TOKEN_GENERATOR, TokenGenerator } from "../ports/token-generator.port";
import { CLOCK, Clock } from "../ports/clock.port";

export interface ValidateSessionInput {
  sessionTokenRaw: string;
}

export interface ValidatedSession {
  userId: string;
  displayName: string;
  roleId: number;
  distritoId: number | null;
}

@Injectable()
export class ValidateSessionUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY) private readonly sessions: SessionRepository,
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(TOKEN_GENERATOR) private readonly tokens: TokenGenerator,
    @Inject(CLOCK) private readonly clock: Clock,
  ) {}

  // Usado tanto por GET /auth/me como por SessionAuthGuard en futuros modulos.
  async execute(input: ValidateSessionInput): Promise<ValidatedSession | null> {
    const tokenHash = this.tokens.hash(input.sessionTokenRaw);
    const session = await this.sessions.findByTokenHash(tokenHash);
    if (!session || !session.isValid(this.clock.now())) return null;

    const user = await this.users.findById(session.userId);
    if (!user || !user.isActive) return null;

    return { userId: user.id, displayName: user.displayName, roleId: user.roleId, distritoId: user.distritoId };
  }
}
