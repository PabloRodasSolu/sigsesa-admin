// Helpers de fecha compartidos entre el log en vivo (siempre HOY) y el
// historial (cualquier dia anterior). Todo a mano, sin Intl/toLocaleString:
// Node no trae los datos de ICU completos para "es-GT" por defecto, asi que
// el mismo texto formateado en el servidor (SSR) y en el navegador puede
// traer un espacio invisible distinto y React lo marca como error de
// hidratacion aunque en pantalla se vea identico. Formateando nosotros
// mismos, el resultado es siempre el mismo string exacto en cualquier
// entorno.

const FECHA_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function esFechaValida(fecha: string): boolean {
  return FECHA_REGEX.test(fecha);
}

export function fechaDeHoy(): string {
  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, "0");
  const dd = String(hoy.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function sumarDias(fecha: string, dias: number): string {
  const [y, m, d] = fecha.split("-").map(Number);
  const fechaObj = new Date(y, m - 1, d);
  fechaObj.setDate(fechaObj.getDate() + dias);
  const yyyy = fechaObj.getFullYear();
  const mm = String(fechaObj.getMonth() + 1).padStart(2, "0");
  const dd = String(fechaObj.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

const MESES_CORTOS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const MESES_LARGOS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function formatHora(d: Date): string {
  const horas24 = d.getHours();
  const horas12 = horas24 % 12 === 0 ? 12 : horas24 % 12;
  const minutos = String(d.getMinutes()).padStart(2, "0");
  const periodo = horas24 < 12 ? "a. m." : "p. m.";
  return `${horas12}:${minutos} ${periodo}`;
}

export function formatFecha(iso: string): string {
  const d = new Date(iso);
  const dia = String(d.getDate()).padStart(2, "0");
  const mes = MESES_CORTOS[d.getMonth()];
  return `${dia}-${mes}, ${formatHora(d)}`;
}

// Fecha "YYYY-MM-DD" -> "31 de agosto de 2026", para el encabezado del historial.
export function formatFechaLarga(fecha: string): string {
  const [y, m, d] = fecha.split("-").map(Number);
  return `${d} de ${MESES_LARGOS[m - 1]} de ${y}`;
}
