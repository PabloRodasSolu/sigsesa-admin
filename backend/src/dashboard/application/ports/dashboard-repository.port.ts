export const DASHBOARD_REPOSITORY = Symbol("DASHBOARD_REPOSITORY");

export interface DistribucionEstado {
  estado: string;
  cantidad: number;
}

export interface CupoOficina {
  oficinaName: string;
  distritoName: string;
  cupo: number;
}

export interface ResumenGeneral {
  totalClientes: number;
  personalOperativo: number;
  distribucionPorEstado: DistribucionEstado[];
  cupos: CupoOficina[];
}

// Vista general de toda la empresa, no filtrada por las oficinas del usuario
// (a diferencia del resto del sistema) - a proposito, es un tablero ejecutivo.
export interface DashboardRepository {
  getResumenGeneral(): Promise<ResumenGeneral>;
}
