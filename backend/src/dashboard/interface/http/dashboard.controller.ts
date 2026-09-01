import { Controller, Get, Inject, UseGuards } from "@nestjs/common";
import { GetResumenGeneralUseCase } from "../../application/use-cases/get-resumen-general.use-case";
import { SessionAuthGuard } from "../../../auth/interface/http/guards/session-auth.guard";

@Controller("dashboard")
@UseGuards(SessionAuthGuard)
export class DashboardController {
  constructor(
    @Inject(GetResumenGeneralUseCase) private readonly getResumenGeneralUseCase: GetResumenGeneralUseCase,
  ) {}

  @Get("resumen-general")
  resumenGeneral() {
    return this.getResumenGeneralUseCase.execute();
  }
}
