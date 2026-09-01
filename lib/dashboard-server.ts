import { cookies } from "next/headers";

const BACKEND_INTERNAL_URL = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:3001";

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

// Llamada server-to-server, igual que novedades-server.ts: directo al backend
// real, reenviando la cookie a mano.
export async function fetchResumenGeneral(): Promise<ResumenGeneral> {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sid")?.value;
  const res = await fetch(`${BACKEND_INTERNAL_URL}/dashboard/resumen-general`, {
    headers: sid ? { cookie: `sid=${sid}` } : {},
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Error ${res.status} al pedir el resumen general`);
  }
  return res.json();
}
