import type { NovedadRegistroDetallado } from "@/lib/novedades-api";
import { formatFecha } from "@/lib/fecha";

// A quien aplica la novedad - a lo sumo uno de los 3 campos viene lleno.
function aplicaA(n: NovedadRegistroDetallado): string | null {
  if (n.empleadoNombre) return n.empleadoNombre;
  if (n.clienteNombre) return n.clienteNombre;
  if (n.vehiculoPlaca) return `Vehículo ${n.vehiculoPlaca}`;
  return null;
}

// Tarjeta de una novedad - la usan tanto el log en vivo (siempre hoy) como el
// historial (dias anteriores), para que las dos vistas se vean idénticas.
export default function NovedadLogItem({ n }: { n: NovedadRegistroDetallado }) {
  const quien = aplicaA(n);

  return (
    <div
      className="border border-outline-variant rounded-lg p-5 flex flex-col gap-3 shadow-sm"
      style={{ backgroundColor: `${n.tipoColor}1a` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className="text-on-surface font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wide font-bold"
            style={{ backgroundColor: n.tipoColor }}
          >
            {n.tipoName}
          </span>
          <span className="font-label-md text-label-md text-on-surface-variant font-bold">
            {n.createdByName}
          </span>
        </div>
        <span className="font-body-md text-body-md text-outline">{formatFecha(n.createdAt)}</span>
      </div>
      <p className="font-body-md text-body-md text-on-surface">{n.descripcion}</p>
      <p className="font-label-sm text-label-sm text-on-surface-variant">
        {n.distritoName} · {n.oficinaName}
        {quien && <> · {quien}</>}
      </p>
    </div>
  );
}
