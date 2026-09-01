import { Body, Controller, Get, HttpCode, Inject, Post, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { Request, Response } from "express";
import { LoginRequestDto } from "./dto/login-request.dto";
import { setSessionCookie, clearSessionCookie } from "./cookie.util";
import { CurrentUser } from "./decorators/current-user.decorator";
import { SessionAuthGuard } from "./guards/session-auth.guard";
import { LoginUseCase } from "../../application/use-cases/login.use-case";
import { LogoutUseCase } from "../../application/use-cases/logout.use-case";
import { ValidatedSession } from "../../application/use-cases/validate-session.use-case";
import { authConfig } from "../../infrastructure/config/auth.config";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(LoginUseCase) private readonly loginUseCase: LoginUseCase,
    @Inject(LogoutUseCase) private readonly logoutUseCase: LogoutUseCase,
  ) {}

  @Post("login")
  @HttpCode(200)
  @Throttle({ default: { limit: authConfig.throttle.limit, ttl: authConfig.throttle.ttlMs } })
  async login(@Body() body: LoginRequestDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const result = await this.loginUseCase.execute({
      username: body.username,
      password: body.password,
      rememberMe: body.rememberMe ?? false,
      ipAddress: req.ip ?? "0.0.0.0",
      userAgent: req.headers["user-agent"] ?? null,
    });

    if (result.outcome !== "success") {
      throw new UnauthorizedException(result.message);
    }

    setSessionCookie(res, result.sessionTokenRaw, result.expiresAt);
    return {
      id: result.user.id,
      displayName: result.user.displayName,
      roleId: result.user.roleId,
      distritoId: result.user.distritoId,
    };
  }

  @Post("logout")
  @HttpCode(200)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const rawToken = req.cookies?.[authConfig.session.cookieName];
    if (rawToken) {
      await this.logoutUseCase.execute({ sessionTokenRaw: rawToken });
    }
    clearSessionCookie(res);
    return { ok: true };
  }

  @Get("me")
  @UseGuards(SessionAuthGuard)
  me(@CurrentUser() user: ValidatedSession) {
    return user;
  }
}
