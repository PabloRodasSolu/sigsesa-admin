import { Inject, Injectable } from "@nestjs/common";
import { DASHBOARD_REPOSITORY, DashboardRepository, ResumenGeneral } from "../ports/dashboard-repository.port";

@Injectable()
export class GetResumenGeneralUseCase {
  constructor(@Inject(DASHBOARD_REPOSITORY) private readonly dashboard: DashboardRepository) {}

  execute(): Promise<ResumenGeneral> {
    return this.dashboard.getResumenGeneral();
  }
}
