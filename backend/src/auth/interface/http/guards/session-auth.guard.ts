import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { authConfig } from "../../../infrastructure/config/auth.config";
import { ValidateSessionUseCase } from "../../../application/use-cases/validate-session.use-case";

// Reutilizable por cualquier modulo futuro (novedades, dashboard) que necesite
// exigir sesion valida - no es especifico de las rutas de auth.
@Injectable()
export class SessionAuthGuard implements CanActivate {
  constructor(@Inject(ValidateSessionUseCase) private readonly validateSession: ValidateSessionUseCase) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const rawToken = request.cookies?.[authConfig.session.cookieName];
    if (!rawToken) {
      throw new UnauthorizedException();
    }

    const session = await this.validateSession.execute({ sessionTokenRaw: rawToken });
    if (!session) {
      throw new UnauthorizedException();
    }

    request.currentUser = session;
    return true;
  }
}
