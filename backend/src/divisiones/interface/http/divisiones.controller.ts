import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { ListOficinasForUserUseCase } from "../../application/use-cases/list-oficinas-for-user.use-case";
import { SessionAuthGuard } from "../../../auth/interface/http/guards/session-auth.guard";
import { CurrentUser } from "../../../auth/interface/http/decorators/current-user.decorator";
import { ValidatedSession } from "../../../auth/application/use-cases/validate-session.use-case";

@Controller("divisiones")
@UseGuards(SessionAuthGuard)
export class DivisionesController {
  constructor(
    @Inject(ListOficinasForUserUseCase) private readonly listOficinasForUserUseCase: ListOficinasForUserUseCase,
  ) {}

  // Solo las oficinas del usuario logueado - no existe (todavia) una ruta
  // "todas las oficinas", porque nada la necesita aun.
  @Get("oficinas")
  oficinas(@CurrentUser() user: ValidatedSession) {
    return this.listOficinasForUserUseCase.execute(user.userId);
  }
}
