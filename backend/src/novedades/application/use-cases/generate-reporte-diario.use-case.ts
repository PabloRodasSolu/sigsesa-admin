import { Inject, Injectable } from "@nestjs/common";
import { Workbook } from "exceljs";
import { NOVEDAD_REGISTRO_REPOSITORY, NovedadRegistroRepository } from "../ports/novedad-registro-repository.port";
import { fechaDeHoy } from "../util/fecha.util";

function aplicaA(row: { empleadoNombre: string | null; clienteNombre: string | null; vehiculoPlaca: string | null }): string {
  if (row.empleadoNombre) return row.empleadoNombre;
  if (row.clienteNombre) return row.clienteNombre;
  if (row.vehiculoPlaca) return `Vehículo ${row.vehiculoPlaca}`;
  return "—";
}

@Injectable()
export class GenerateReporteDiarioUseCase {
  constructor(@Inject(NOVEDAD_REGISTRO_REPOSITORY) private readonly registros: NovedadRegistroRepository) {}

  async execute(userId: string, fecha?: string): Promise<Buffer> {
    const filas = await this.registros.listByDate(userId, fecha ?? fechaDeHoy());

    const workbook = new Workbook();
    const hoja = workbook.addWorksheet(`Movimientos del ${fecha ?? fechaDeHoy()}`);

    hoja.columns = [
      { header: "Hora", key: "hora", width: 10 },
      { header: "Tipo", key: "tipo", width: 20 },
      { header: "Aplica a", key: "aplicaA", width: 32 },
      { header: "Distrito", key: "distrito", width: 16 },
      { header: "Oficina", key: "oficina", width: 20 },
      { header: "Registrado por", key: "registradoPor", width: 24 },
      { header: "Descripción", key: "descripcion", width: 50 },
    ];
    hoja.getRow(1).font = { bold: true };

    for (const fila of filas) {
      hoja.addRow({
        hora: fila.createdAt.toLocaleTimeString("es-GT", { hour: "2-digit", minute: "2-digit" }),
        tipo: fila.tipoName,
        aplicaA: aplicaA(fila),
        distrito: fila.distritoName,
        oficina: fila.oficinaName,
        registradoPor: fila.createdByName,
        descripcion: fila.descripcion,
      });
    }

    const buffer = await workbook.xlsx.writeBuffer();
    return Buffer.from(buffer);
  }
}
