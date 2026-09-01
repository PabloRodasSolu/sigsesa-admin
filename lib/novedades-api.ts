// Cliente de API para el navegador - todo pasa por /api/* (el proxy same-origin
// de next.config.ts), nunca directo al backend. Ver lib/novedades-server.ts
// para las llamadas que corren en el servidor (esas si van directo al backend).

export type NovedadSelector = "empleado" | "cliente_puestos" | "empleado_cliente_vehiculo" | "ninguno";

export interface NovedadTipo {
  id: number;
  code: string;
  name: string;
  color: string;
  selector: NovedadSelector;
}

export type EstadoEmpleado = "disponible" | "no_disponible" | "ausente" | "baja";

export interface Empleado {
  id: string;
  codigo: string;
  nombre: string;
  estado: EstadoEmpleado;
  // null si no está asignado a ninguna oficina ahora mismo (nunca tuvo un
  // Alta, o su última novedad fue una Baja).
  oficinaId: string | null;
  oficinaName: string | null;
}

export interface Cliente {
  id: string;
  codigo: string;
  nombre: string;
  // null solo en clientes viejos sembrados antes de que existiera la relacion
  // cliente<->oficina - un cliente creado por el sistema siempre trae la suya.
  oficinaId: string | null;
}

export interface Vehiculo {
  id: string;
  placa: string;
}

export interface Oficina {
  id: string;
  code: string;
  name: string;
  distritoId: number;
  distritoName: string;
}

export interface NovedadRegistro {
  id: string;
  tipoCode: string;
  tipoName: string;
  tipoColor: string;
  oficinaName: string;
  distritoName: string;
  descripcion: string;
  estado: string;
  createdByName: string;
  createdAt: string;
}

// Forma "enriquecida" que devuelve GET /novedades y GET /novedades/historial
// - una novedad con el tipo, oficina/distrito y a quien aplica ya resueltos
// (a lo sumo uno de los 3 nombres viene lleno, porque solo se puede adjuntar
// un empleado/cliente/vehiculo por novedad).
export interface NovedadRegistroDetallado {
  id: string;
  tipoCode: string;
  tipoName: string;
  tipoColor: string;
  oficinaName: string;
  distritoName: string;
  descripcion: string;
  estado: string;
  createdByName: string;
  createdAt: string;
  empleadoNombre: string | null;
  clienteNombre: string | null;
  vehiculoPlaca: string | null;
}

export interface CreateClientePayload {
  codigo: string;
  nombre: string;
  nit?: string;
}

export interface CreateNovedadPayload {
  tipoId: number;
  oficinaId: string;
  descripcion: string;
  empleadoIds?: string[];
  clientes?: { clienteId: string; cantidadPuestos?: number }[];
  vehiculoIds?: string[];
}

const ESTADO_EMPLEADO_LABELS: Record<EstadoEmpleado, string> = {
  disponible: "Disponible",
  no_disponible: "No disponible",
  ausente: "Ausente",
  baja: "Baja",
};

export function estadoEmpleadoLabel(estado: string): string {
  return ESTADO_EMPLEADO_LABELS[estado as EstadoEmpleado] ?? estado;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new Error(body?.message ?? `Error ${res.status}`);
  }
  return res.json();
}

export function searchEmpleados(query: string): Promise<Empleado[]> {
  return apiFetch(`/novedades/empleados/buscar?q=${encodeURIComponent(query)}`);
}

export function searchClientes(query: string): Promise<Cliente[]> {
  return apiFetch(`/novedades/clientes/buscar?q=${encodeURIComponent(query)}`);
}

export function searchVehiculos(query: string): Promise<Vehiculo[]> {
  return apiFetch(`/novedades/vehiculos/buscar?q=${encodeURIComponent(query)}`);
}

export function createNovedad(payload: CreateNovedadPayload): Promise<NovedadRegistro> {
  return apiFetch("/novedades", { method: "POST", body: JSON.stringify(payload) });
}

export function fetchOficinas(): Promise<Oficina[]> {
  return apiFetch("/divisiones/oficinas");
}

export function createCliente(payload: CreateClientePayload): Promise<Cliente> {
  return apiFetch("/novedades/clientes", { method: "POST", body: JSON.stringify(payload) });
}
