import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { DashboardController } from "./interface/http/dashboard.controller";
import { GetResumenGeneralUseCase } from "./application/use-cases/get-resumen-general.use-case";
import { DASHBOARD_REPOSITORY } from "./application/ports/dashboard-repository.port";
import { KyselyDashboardRepository } from "./infrastructure/persistence/kysely/dashboard.repository";

@Module({
  imports: [AuthModule],
  controllers: [DashboardController],
  providers: [GetResumenGeneralUseCase, { provide: DASHBOARD_REPOSITORY, useClass: KyselyDashboardRepository }],
})
export class DashboardModule {}
