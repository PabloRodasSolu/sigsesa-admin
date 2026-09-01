import { cookies } from "next/headers";
import type { NovedadTipo, NovedadRegistroDetallado, Oficina } from "./novedades-api";

const BACKEND_INTERNAL_URL = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:3001";

// Llamadas server-to-server, igual que proxy.ts: directo al backend real,
// reenviando la cookie a mano (esto no pasa por el navegador).
async function backendFetch<T>(path: string): Promise<T> {
  const cookieStore = await cookies();
  const sid = cookieStore.get("sid")?.value;
  const res = await fetch(`${BACKEND_INTERNAL_URL}${path}`, {
    headers: sid ? { cookie: `sid=${sid}` } : {},
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Error ${res.status} al pedir ${path}`);
  }
  return res.json();
}

export function fetchTipos(): Promise<NovedadTipo[]> {
  return backendFetch("/novedades/tipos");
}

// Siempre HOY - el backend no acepta fecha en este endpoint a proposito
// (ver GET /novedades/historial para dias anteriores).
export function fetchNovedadesLog(): Promise<NovedadRegistroDetallado[]> {
  return backendFetch("/novedades");
}

export function fetchOficinasForUser(): Promise<Oficina[]> {
  return backendFetch("/divisiones/oficinas");
}

export function fetchHistorial(fecha: string): Promise<NovedadRegistroDetallado[]> {
  return backendFetch(`/novedades/historial?date=${encodeURIComponent(fecha)}`);
}
