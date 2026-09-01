import { Module } from "@nestjs/common";
import { AuthController } from "./interface/http/auth.controller";
import { SessionAuthGuard } from "./interface/http/guards/session-auth.guard";
import { LoginUseCase } from "./application/use-cases/login.use-case";
import { LogoutUseCase } from "./application/use-cases/logout.use-case";
import { ValidateSessionUseCase } from "./application/use-cases/validate-session.use-case";
import { USER_REPOSITORY } from "./application/ports/user-repository.port";
import { SESSION_REPOSITORY } from "./application/ports/session-repository.port";
import { LOGIN_ATTEMPT_REPOSITORY } from "./application/ports/login-attempt-repository.port";
import { PASSWORD_HASHER } from "./application/ports/password-hasher.port";
import { TOKEN_GENERATOR } from "./application/ports/token-generator.port";
import { CLOCK } from "./application/ports/clock.port";
import { KyselyUserRepository } from "./infrastructure/persistence/kysely/user.repository";
import { KyselySessionRepository } from "./infrastructure/persistence/kysely/session.repository";
import { KyselyLoginAttemptRepository } from "./infrastructure/persistence/kysely/login-attempt.repository";
import { Argon2PasswordHasher } from "./infrastructure/security/argon2-password-hasher";
import { CryptoTokenGenerator } from "./infrastructure/security/crypto-token-generator";
import { SystemClock } from "./infrastructure/security/system-clock";

@Module({
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    LogoutUseCase,
    ValidateSessionUseCase,
    SessionAuthGuard,
    { provide: USER_REPOSITORY, useClass: KyselyUserRepository },
    { provide: SESSION_REPOSITORY, useClass: KyselySessionRepository },
    { provide: LOGIN_ATTEMPT_REPOSITORY, useClass: KyselyLoginAttemptRepository },
    { provide: PASSWORD_HASHER, useClass: Argon2PasswordHasher },
    { provide: TOKEN_GENERATOR, useClass: CryptoTokenGenerator },
    { provide: CLOCK, useClass: SystemClock },
  ],
  // SessionAuthGuard se exporta para que cualquier modulo futuro pueda exigir
  // sesion valida sin reimplementarlo - y como el guard depende de
  // ValidateSessionUseCase, esa dependencia tiene que exportarse tambien.
  exports: [SessionAuthGuard, ValidateSessionUseCase],
})
export class AuthModule {}
