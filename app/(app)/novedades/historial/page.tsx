import Link from "next/link";
import { fetchHistorial } from "@/lib/novedades-server";
import { esFechaValida, fechaDeHoy, formatFechaLarga, sumarDias } from "@/lib/fecha";
import NovedadLogItem from "@/components/novedades/NovedadLogItem";

// El log en vivo de /novedades solo muestra HOY (amanece limpio cada día);
// esta página es el acceso a los días anteriores - un día a la vez, con
// flechas para moverse, en vez de un rango. Todo por query param (?date=)
// para que sea un Server Component puro: sin JS, el <form method="get"> y
// los <Link> hacen la navegación solos.
export default async function HistorialPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date: dateParam } = await searchParams;
  const hoy = fechaDeHoy();
  // Fecha inválida, ausente, o en el futuro -> hoy (nunca se pide al backend
  // una fecha que no tenga sentido).
  const fecha = dateParam && esFechaValida(dateParam) && dateParam <= hoy ? dateParam : hoy;

  const log = await fetchHistorial(fecha);

  const diaAnterior = sumarDias(fecha, -1);
  const diaSiguiente = sumarDias(fecha, 1);
  const puedeAvanzar = diaSiguiente <= hoy;

  return (
    <div className="max-w-5xl mx-auto space-y-space-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-headline-md text-headline-md text-primary">Historial de Novedades</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">{formatFechaLarga(fecha)}</p>
        </div>
        <Link
          href="/novedades"
          className="flex items-center gap-2 font-label-sm text-label-sm text-primary border border-outline-variant rounded-lg px-3 py-1.5 hover:bg-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Volver a Novedades
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3 bg-surface-container-lowest border border-outline-variant rounded-lg p-4">
        <Link
          href={`/novedades/historial?date=${diaAnterior}`}
          className="flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant hover:bg-surface-variant transition-colors"
          aria-label="Día anterior"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </Link>

        <form action="/novedades/historial" method="get" className="flex items-center gap-2">
          <input
            type="date"
            name="date"
            defaultValue={fecha}
            max={hoy}
            className="h-10 px-3 border border-outline-variant rounded bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim outline-none transition-colors"
          />
          <button
            type="submit"
            className="h-10 px-4 rounded-lg border border-outline-variant text-primary font-label-md text-label-md hover:bg-surface-variant transition-colors"
          >
            Ver
          </button>
        </form>

        {puedeAvanzar ? (
          <Link
            href={`/novedades/historial?date=${diaSiguiente}`}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant hover:bg-surface-variant transition-colors"
            aria-label="Día siguiente"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </Link>
        ) : (
          <span
            className="flex items-center justify-center w-10 h-10 rounded-full border border-outline-variant opacity-30"
            aria-hidden
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </span>
        )}

        <a
          href={`/api/novedades/reporte-diario?date=${fecha}`}
          className="ml-auto flex items-center gap-2 font-label-sm text-label-sm text-primary border border-outline-variant rounded-lg px-3 py-1.5 hover:bg-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">download</span>
          Descargar Excel de este día
        </a>
      </div>

      <div className="flex flex-col gap-4">
        {log.length === 0 && (
          <p className="font-body-md text-body-md text-on-surface-variant">
            No hay novedades registradas ese día.
          </p>
        )}
        {log.map((n) => (
          <NovedadLogItem key={n.id} n={n} />
        ))}
      </div>
    </div>
  );
}
