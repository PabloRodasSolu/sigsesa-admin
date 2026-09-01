import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { ValidatedSession } from "../../../application/use-cases/validate-session.use-case";

// SessionAuthGuard deja la sesion validada en request.currentUser antes de que
// el controller se ejecute; este decorator solo la lee de ahi.
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): ValidatedSession => {
    const request = ctx.switchToHttp().getRequest();
    return request.currentUser;
  },
);
