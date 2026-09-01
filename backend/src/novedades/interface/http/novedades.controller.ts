import { BadRequestException, Body, Controller, Get, Inject, Post, Query, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { CreateNovedadRequestDto } from "./dto/create-novedad-request.dto";
import { CreateClienteRequestDto } from "./dto/create-cliente-request.dto";
import { ListTiposUseCase } from "../../application/use-cases/list-tipos.use-case";
import { SearchEmpleadosUseCase } from "../../application/use-cases/search-empleados.use-case";
import { SearchClientesUseCase } from "../../application/use-cases/search-clientes.use-case";
import { SearchVehiculosUseCase } from "../../application/use-cases/search-vehiculos.use-case";
import { CreateNovedadUseCase } from "../../application/use-cases/create-novedad.use-case";
import { CreateClienteUseCase } from "../../application/use-cases/create-cliente.use-case";
import { ListNovedadesUseCase } from "../../application/use-cases/list-novedades.use-case";
import { GenerateReporteDiarioUseCase } from "../../application/use-cases/generate-reporte-diario.use-case";
import { SessionAuthGuard } from "../../../auth/interface/http/guards/session-auth.guard";
import { CurrentUser } from "../../../auth/interface/http/decorators/current-user.decorator";
import { ValidatedSession } from "../../../auth/application/use-cases/validate-session.use-case";
import { esFechaValida, fechaDeHoy } from "../../application/util/fecha.util";

@Controller("novedades")
@UseGuards(SessionAuthGuard)
export class NovedadesController {
  constructor(
    @Inject(ListTiposUseCase) private readonly listTiposUseCase: ListTiposUseCase,
    @Inject(SearchEmpleadosUseCase) private readonly searchEmpleadosUseCase: SearchEmpleadosUseCase,
    @Inject(SearchClientesUseCase) private readonly searchClientesUseCase: SearchClientesUseCase,
    @Inject(SearchVehiculosUseCase) private readonly searchVehiculosUseCase: SearchVehiculosUseCase,
    @Inject(CreateNovedadUseCase) private readonly createNovedadUseCase: CreateNovedadUseCase,
    @Inject(CreateClienteUseCase) private readonly createClienteUseCase: CreateClienteUseCase,
    @Inject(ListNovedadesUseCase) private readonly listNovedadesUseCase: ListNovedadesUseCase,
    @Inject(GenerateReporteDiarioUseCase) private readonly generateReporteDiarioUseCase: GenerateReporteDiarioUseCase,
  ) {}

  @Get("tipos")
  tipos() {
    return this.listTiposUseCase.execute();
  }

  @Get("empleados/buscar")
  empleados(@Query("q") q = "", @CurrentUser() user: ValidatedSession) {
    return this.searchEmpleadosUseCase.execute(q, user.userId);
  }

  @Get("clientes/buscar")
  clientes(@Query("q") q = "") {
    return this.searchClientesUseCase.execute(q);
  }

  @Post("clientes")
  crearCliente(@Body() body: CreateClienteRequestDto, @CurrentUser() user: ValidatedSession) {
    if (user.distritoId === null) {
      throw new BadRequestException("Tu usuario no tiene un distrito asignado, no se puede crear el cliente");
    }
    return this.createClienteUseCase.execute({
      codigo: body.codigo,
      nombre: body.nombre,
      nit: body.nit,
      distritoId: user.distritoId,
      createdByUserId: user.userId,
    });
  }

  @Get("vehiculos/buscar")
  vehiculos(@Query("q") q = "") {
    return this.searchVehiculosUseCase.execute(q);
  }

  @Post()
  async create(@Body() body: CreateNovedadRequestDto, @CurrentUser() user: ValidatedSession) {
    const result = await this.createNovedadUseCase.execute({
      tipoId: body.tipoId,
      oficinaId: body.oficinaId,
      descripcion: body.descripcion,
      empleadoIds: body.empleadoIds,
      clientes: body.clientes,
      vehiculoIds: body.vehiculoIds,
      createdBy: user.userId,
    });

    if (result.outcome === "invalid") {
      throw new BadRequestException(result.message);
    }
    return result.registro;
  }

  // Log en vivo - siempre HOY, sin parametro de fecha. Asi amanece limpio
  // cada dia: nunca arrastra novedades de dias anteriores.
  @Get()
  list(@CurrentUser() user: ValidatedSession) {
    return this.listNovedadesUseCase.execute(user.userId);
  }

  // Acceso a dias anteriores (el log en vivo solo muestra hoy). `date` es
  // obligatorio aqui para que quede explicito que dia se esta pidiendo.
  @Get("historial")
  historial(@Query("date") date: string, @CurrentUser() user: ValidatedSession) {
    if (!date || !esFechaValida(date)) {
      throw new BadRequestException("Parámetro 'date' inválido, formato esperado YYYY-MM-DD");
    }
    return this.listNovedadesUseCase.execute(user.userId, date);
  }

  @Get("reporte-diario")
  async reporteDiario(
    @Query("date") date: string | undefined,
    @CurrentUser() user: ValidatedSession,
    @Res() res: Response,
  ) {
    if (date && !esFechaValida(date)) {
      throw new BadRequestException("Parámetro 'date' inválido, formato esperado YYYY-MM-DD");
    }
    const buffer = await this.generateReporteDiarioUseCase.execute(user.userId, date);
    res.set({
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="novedades-${date ?? fechaDeHoy()}.xlsx"`,
    });
    res.send(buffer);
  }
}
