const FECHA_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function esFechaValida(fecha: string): boolean {
  return FECHA_REGEX.test(fecha);
}

// Fecha de "hoy" en la hora local del proceso de Node (no UTC) - consistente
// con como se calculan las demas fechas mostradas en pantalla en este modulo.
export function fechaDeHoy(): string {
  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, "0");
  const dd = String(hoy.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
