import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY, UserRepository } from "../ports/user-repository.port";
import { SESSION_REPOSITORY, SessionRepository } from "../ports/session-repository.port";
import { LOGIN_ATTEMPT_REPOSITORY, LoginAttemptRepository } from "../ports/login-attempt-repository.port";
import { PASSWORD_HASHER, PasswordHasher } from "../ports/password-hasher.port";
import { TOKEN_GENERATOR, TokenGenerator } from "../ports/token-generator.port";
import { CLOCK, Clock } from "../ports/clock.port";
import { authConfig } from "../../infrastructure/config/auth.config";

const GENERIC_MESSAGE = "Usuario o contraseña incorrectos";

export interface LoginInput {
  username: string;
  password: string;
  rememberMe: boolean;
  ipAddress: string;
  userAgent: string | null;
}

export interface LoginSuccess {
  outcome: "success";
  sessionTokenRaw: string;
  expiresAt: Date;
  user: { id: string; displayName: string; roleId: number; distritoId: number | null };
}

export interface LoginRejected {
  outcome: "invalid_credentials" | "account_locked";
  message: string;
}

export type LoginResult = LoginSuccess | LoginRejected;

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly users: UserRepository,
    @Inject(SESSION_REPOSITORY) private readonly sessions: SessionRepository,
    @Inject(LOGIN_ATTEMPT_REPOSITORY) private readonly attempts: LoginAttemptRepository,
    @Inject(PASSWORD_HASHER) private readonly hasher: PasswordHasher,
    @Inject(TOKEN_GENERATOR) private readonly tokens: TokenGenerator,
    @Inject(CLOCK) private readonly clock: Clock,
  ) {}

  async execute(input: LoginInput): Promise<LoginResult> {
    const usernameNormalized = input.username.trim().toLowerCase();
    const user = await this.users.findByUsernameNormalized(usernameNormalized);
    const now = this.clock.now();

    if (!user) {
      // Timing equalizer: sin esto, "no existe" respondería mas rapido que
      // "contraseña incorrecta" y delataría que usuarios existen.
      await this.hasher.verify(this.hasher.dummyHash(), input.password);
      await this.attempts.record({
        userId: null,
        attemptedUsername: input.username,
        result: "user_not_found",
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      });
      return { outcome: "invalid_credentials", message: GENERIC_MESSAGE };
    }

    if (!user.isActive) {
      await this.hasher.verify(user.passwordHash, input.password);
      await this.attempts.record({
        userId: user.id,
        attemptedUsername: input.username,
        result: "account_disabled",
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      });
      return { outcome: "invalid_credentials", message: GENERIC_MESSAGE };
    }

    if (user.isLocked(now)) {
      await this.hasher.verify(user.passwordHash, input.password);
      await this.attempts.record({
        userId: user.id,
        attemptedUsername: input.username,
        result: "account_locked",
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      });
      return { outcome: "account_locked", message: "Cuenta bloqueada temporalmente. Intenta de nuevo más tarde." };
    }

    const passwordMatches = await this.hasher.verify(user.passwordHash, input.password);
    if (!passwordMatches) {
      const failedCount = await this.users.incrementFailedAttempts(user.id);
      if (failedCount >= authConfig.lockout.maxFailedAttempts) {
        await this.users.lockUntil(user.id, new Date(now.getTime() + authConfig.lockout.lockDurationMs));
      }
      await this.attempts.record({
        userId: user.id,
        attemptedUsername: input.username,
        result: "bad_password",
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
      });
      return { outcome: "invalid_credentials", message: GENERIC_MESSAGE };
    }

    await this.users.resetFailedAttempts(user.id);
    await this.users.updateLastLogin(user.id);

    const { raw, hash } = this.tokens.generate();
    const ttlMs = input.rememberMe ? authConfig.session.ttlRememberMeMs : authConfig.session.ttlMs;
    const expiresAt = new Date(now.getTime() + ttlMs);

    await this.sessions.create({
      userId: user.id,
      tokenHash: hash,
      expiresAt,
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
    });
    await this.attempts.record({
      userId: user.id,
      attemptedUsername: input.username,
      result: "success",
      ipAddress: input.ipAddress,
      userAgent: input.userAgent,
    });

    return {
      outcome: "success",
      sessionTokenRaw: raw,
      expiresAt,
      user: { id: user.id, displayName: user.displayName, roleId: user.roleId, distritoId: user.distritoId },
    };
  }
}
