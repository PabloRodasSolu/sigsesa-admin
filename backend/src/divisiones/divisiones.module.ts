import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { DivisionesController } from "./interface/http/divisiones.controller";
import { ListOficinasForUserUseCase } from "./application/use-cases/list-oficinas-for-user.use-case";
import { OFICINA_REPOSITORY } from "./application/ports/oficina-repository.port";
import { KyselyOficinaRepository } from "./infrastructure/persistence/kysely/oficina.repository";

@Module({
  imports: [AuthModule],
  controllers: [DivisionesController],
  providers: [ListOficinasForUserUseCase, { provide: OFICINA_REPOSITORY, useClass: KyselyOficinaRepository }],
})
export class DivisionesModule {}
