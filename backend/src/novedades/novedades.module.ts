import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { NovedadesController } from "./interface/http/novedades.controller";
import { ListTiposUseCase } from "./application/use-cases/list-tipos.use-case";
import { SearchEmpleadosUseCase } from "./application/use-cases/search-empleados.use-case";
import { SearchClientesUseCase } from "./application/use-cases/search-clientes.use-case";
import { SearchVehiculosUseCase } from "./application/use-cases/search-vehiculos.use-case";
import { CreateNovedadUseCase } from "./application/use-cases/create-novedad.use-case";
import { CreateClienteUseCase } from "./application/use-cases/create-cliente.use-case";
import { ListNovedadesUseCase } from "./application/use-cases/list-novedades.use-case";
import { GenerateReporteDiarioUseCase } from "./application/use-cases/generate-reporte-diario.use-case";
import { NOVEDAD_TIPO_REPOSITORY } from "./application/ports/novedad-tipo-repository.port";
import { EMPLEADO_REPOSITORY } from "./application/ports/empleado-repository.port";
import { CLIENTE_REPOSITORY } from "./application/ports/cliente-repository.port";
import { VEHICULO_REPOSITORY } from "./application/ports/vehiculo-repository.port";
import { NOVEDAD_REGISTRO_REPOSITORY } from "./application/ports/novedad-registro-repository.port";
import { OFICINA_CUPO_REPOSITORY } from "./application/ports/oficina-cupo-repository.port";
import { KyselyNovedadTipoRepository } from "./infrastructure/persistence/kysely/novedad-tipo.repository";
import { KyselyEmpleadoRepository } from "./infrastructure/persistence/kysely/empleado.repository";
import { KyselyClienteRepository } from "./infrastructure/persistence/kysely/cliente.repository";
import { KyselyVehiculoRepository } from "./infrastructure/persistence/kysely/vehiculo.repository";
import { KyselyNovedadRegistroRepository } from "./infrastructure/persistence/kysely/novedad-registro.repository";
import { KyselyOficinaCupoRepository } from "./infrastructure/persistence/kysely/oficina-cupo.repository";

@Module({
  // AuthModule exporta SessionAuthGuard - lo necesitamos porque toda ruta de
  // este controller exige sesion valida (ver @UseGuards en el controller).
  imports: [AuthModule],
  controllers: [NovedadesController],
  providers: [
    ListTiposUseCase,
    SearchEmpleadosUseCase,
    SearchClientesUseCase,
    SearchVehiculosUseCase,
    CreateNovedadUseCase,
    CreateClienteUseCase,
    ListNovedadesUseCase,
    GenerateReporteDiarioUseCase,
    { provide: NOVEDAD_TIPO_REPOSITORY, useClass: KyselyNovedadTipoRepository },
    { provide: EMPLEADO_REPOSITORY, useClass: KyselyEmpleadoRepository },
    { provide: CLIENTE_REPOSITORY, useClass: KyselyClienteRepository },
    { provide: VEHICULO_REPOSITORY, useClass: KyselyVehiculoRepository },
    { provide: NOVEDAD_REGISTRO_REPOSITORY, useClass: KyselyNovedadRegistroRepository },
    { provide: OFICINA_CUPO_REPOSITORY, useClass: KyselyOficinaCupoRepository },
  ],
})
export class NovedadesModule {}
