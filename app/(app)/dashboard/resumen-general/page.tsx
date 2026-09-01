import { fetchResumenGeneral } from "@/lib/dashboard-server";
import { estadoEmpleadoLabel } from "@/lib/novedades-api";

// Estas 3 secciones (barras, ranking, meta) son cifras de Utilidad
// (financieras) que hoy no viven en ningun lado del sistema nuevo (esa base
// es Contabilidad_SIGSESA, aparte) - se dejan en 0 a proposito (no con datos
// de ejemplo inventados) para no confundir en una presentacion de avance.
// Total de Clientes, Personal Operativo, la dona y los cupos SI son reales.
const DIVISIONES = [
  { label: "Otros Clientes", value: 0, pct: 0, color: "#2b83ff" },
  { label: "Institucional", value: 0, pct: 0, color: "#7c4dff" },
  { label: "Banrural", value: 0, pct: 0, color: "#00b389" },
  { label: "Anexos", value: 0, pct: 0, color: "#8bd450" },
  { label: "ESURAM", value: 0, pct: 0, color: "#ff8a3d" },
];
// || 1 evita dividir entre 0 mientras todos los pct sigan en 0.
const DIVISIONES_MAX_PCT = Math.max(...DIVISIONES.map((d) => d.pct)) || 1;

const RANKING = [
  { name: "Residenciales Amayito (Motoristas)", value: 0 },
  { name: "Finca San Sebastián (Jefe de grupo)", value: 0 },
  { name: "Quiché Save The Children International", value: 0 },
  { name: "Share Guatemala Huehuetenango", value: 0 },
  { name: "Share Guatemala Cobán", value: 0 },
  { name: "Super Autos Jack II", value: 0 },
];
const RANKING_MAX = RANKING[0].value || 1;

function formatQ(value: number) {
  return `Q${value.toLocaleString("es-GT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

const ESTADO_COLORS: Record<string, string> = {
  disponible: "#198754",
  no_disponible: "#001f3f",
  ausente: "#2b83ff",
  baja: "#ba1a1a",
};
const ESTADO_ORDEN = ["disponible", "no_disponible", "ausente", "baja"];
const CIRCUNFERENCIA = 2 * Math.PI * 40;

export default async function ResumenGeneralPage() {
  const resumen = await fetchResumenGeneral();

  const totalEstados = resumen.distribucionPorEstado.reduce((sum, d) => sum + d.cantidad, 0) || 1;
  const arcosBase = ESTADO_ORDEN.map((estado) => {
    const cantidad = resumen.distribucionPorEstado.find((d) => d.estado === estado)?.cantidad ?? 0;
    return { estado, cantidad, dash: (cantidad / totalEstados) * CIRCUNFERENCIA, color: ESTADO_COLORS[estado] };
  });
  // offset = -(suma de los arcos anteriores) - se calcula aparte, sin
  // reasignar un acumulador, para no mutar nada durante el render.
  const arcos = arcosBase.map((a, i) => ({
    ...a,
    offset: -arcosBase.slice(0, i).reduce((sum, b) => sum + b.dash, 0),
  }));

  return (
      <div className="max-w-7xl mx-auto space-y-space-lg">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          <div className="bg-surface border border-outline-variant rounded-xl p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">group</span>
              <p className="text-label-md font-label-md uppercase">
                Total de Clientes
              </p>
            </div>
            <p className="text-headline-lg font-headline-lg text-on-surface mt-2">
              {resumen.totalClientes}
            </p>
            <p className="text-label-sm font-label-sm text-secondary mt-1">
              Clientes activos
            </p>
          </div>
          <div className="bg-surface border border-outline-variant rounded-xl p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">shield_person</span>
              <p className="text-label-md font-label-md uppercase">
                Personal Operativo (AS)
              </p>
            </div>
            <p className="text-headline-lg font-headline-lg text-on-tertiary-container mt-2">
              {resumen.personalOperativo}
            </p>
            <p className="text-label-sm font-label-sm text-secondary mt-1">
              Empleados activos
            </p>
          </div>
          <div className="bg-surface border border-outline-variant rounded-xl p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-lg">payments</span>
              <p className="text-label-md font-label-md uppercase">
                Utilidad Anual
              </p>
            </div>
            <p className="text-headline-lg font-headline-lg text-on-surface mt-2">
              Q 0.00
            </p>
          </div>
          <div className="bg-primary-container text-on-primary-container border border-primary-container rounded-xl p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2 opacity-80">
              <span className="material-symbols-outlined text-lg">trending_up</span>
              <p className="text-label-md font-label-md uppercase">
                Utilidad Neta Mensual
              </p>
            </div>
            <p className="text-headline-lg font-headline-lg text-on-primary mt-2">
              Q 0.00
            </p>
          </div>
        </div>
        {/* Charts & Rankings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
          {/* Donut Chart Area */}
          <div className="bg-surface border border-outline-variant rounded-xl p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)] lg:col-span-1">
            <h3 className="flex items-center gap-2 text-headline-sm font-headline-sm text-on-surface mb-6 border-b border-outline-variant pb-4 bg-surface-bright -mx-space-md px-space-md pt-2 rounded-t-xl">
              <span className="material-symbols-outlined text-lg text-primary">donut_large</span>
              Distribución de Personal Operativo
            </h3>
            <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="none" r="40" stroke="var(--color-surface-variant)" strokeWidth="20"></circle>
                {arcos.map((a) => (
                  <circle
                    key={a.estado}
                    cx="50"
                    cy="50"
                    fill="none"
                    r="40"
                    stroke={a.color}
                    strokeDasharray={`${a.dash} ${CIRCUNFERENCIA}`}
                    strokeDashoffset={a.offset}
                    strokeWidth="20"
                  ></circle>
                ))}
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-label-sm font-label-sm text-on-surface-variant uppercase">
                  Total AS
                </span>
                <span className="text-headline-lg font-headline-lg text-on-surface">
                  {resumen.personalOperativo}
                </span>
              </div>
            </div>
            <div className="mt-8 space-y-3">
              {arcos.map((a) => (
                <div key={a.estado} className="flex justify-between items-center text-body-md font-body-md">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: a.color }}></span>
                    {estadoEmpleadoLabel(a.estado)}
                  </div>
                  <span className="font-bold">{a.cantidad}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Bar Chart Area */}
          <div className="bg-surface border border-outline-variant rounded-xl p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)] lg:col-span-2">
            <h3 className="flex items-center gap-2 text-headline-sm font-headline-sm text-on-surface mb-6 border-b border-outline-variant pb-4 bg-surface-bright -mx-space-md px-space-md pt-2 rounded-t-xl">
              <span className="material-symbols-outlined text-lg text-primary">bar_chart</span>
              Utilidad Neta Mensual por División
            </h3>
            <div className="flex items-end justify-between gap-2 h-56 mt-4 px-2">
              {DIVISIONES.map((d) => (
                <div key={d.label} className="flex flex-col items-center flex-1 h-full justify-end">
                  <span className="text-label-sm font-label-sm font-bold text-on-surface mb-1 whitespace-nowrap">
                    {formatQ(d.value)}
                  </span>
                  <span className="text-label-sm font-label-sm text-on-surface-variant mb-2">
                    {d.pct}%
                  </span>
                  <div
                    className="w-full max-w-[56px] rounded-t-md transition-all"
                    style={{
                      height: `${(d.pct / DIVISIONES_MAX_PCT) * 100}%`,
                      backgroundColor: d.color,
                      minHeight: 6,
                    }}
                  ></div>
                  <span className="text-label-sm font-label-sm text-on-surface-variant mt-2 text-center uppercase">
                    {d.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
          {/* Horizontal Ranking */}
          <div className="bg-surface border border-outline-variant rounded-xl p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)]">
            <h3 className="flex items-center gap-2 text-headline-sm font-headline-sm text-on-surface mb-4 border-b border-outline-variant pb-4 bg-surface-bright -mx-space-md px-space-md pt-2 rounded-t-xl">
              <span className="material-symbols-outlined text-lg text-primary">trending_up</span>
              Top Margen Útil - Otros Clientes
            </h3>
            <ul className="space-y-4">
              {RANKING.map((r, i) => (
                <li key={r.name} className="border-b border-outline-variant pb-3 last:border-0">
                  <div className="flex items-center justify-between text-body-md font-body-md mb-1.5">
                    <span className="text-on-surface flex-1">
                      {i + 1}. {r.name}
                    </span>
                    <span className="font-bold ml-4">
                      {formatQ(r.value)}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success rounded-full"
                      style={{ width: `${(r.value / RANKING_MAX) * 100}%` }}
                    ></div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* Highlight Card */}
          <div className="bg-primary-container text-on-primary-container border border-primary-container rounded-xl p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)] flex flex-col justify-center relative overflow-hidden">
            {/* subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
            <div className="relative z-10">
              <h3 className="flex items-center gap-2 text-headline-md font-headline-md text-on-primary mb-6">
                <span className="material-symbols-outlined text-xl">flag</span>
                Meta de Utilidad (Cierre Anual)
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-label-md font-label-md uppercase opacity-80">
                    Banrural (Agencias + Anexos)
                  </p>
                  <p className="text-headline-lg font-headline-lg text-on-primary mt-1">
                    Q0.00
                  </p>
                </div>
                <div className="h-px w-full bg-on-primary opacity-20"></div>
                <div>
                  <p className="text-label-md font-label-md uppercase opacity-80">
                    Otros Clientes
                  </p>
                  <p className="text-headline-lg font-headline-lg text-on-primary mt-1">
                    Q0.00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Cupos por oficina - dato real */}
        <div className="bg-surface border border-outline-variant rounded-xl shadow-[0_4px_4px_rgba(0,0,0,0.02)] overflow-hidden">
          <h3 className="flex items-center gap-2 text-headline-sm font-headline-sm text-on-surface p-space-md border-b border-outline-variant bg-surface-bright">
            <span className="material-symbols-outlined text-lg text-primary">store</span>
            Cupos por Oficina
          </h3>
          {resumen.cupos.length === 0 ? (
            <p className="p-space-md font-body-md text-body-md text-on-surface-variant">
              Todavía no hay oficinas registradas.
            </p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-outline-variant">
                  <th className="px-space-md py-2 font-label-sm text-label-sm text-on-surface-variant">Distrito</th>
                  <th className="px-space-md py-2 font-label-sm text-label-sm text-on-surface-variant">Oficina</th>
                  <th className="px-space-md py-2 font-label-sm text-label-sm text-on-surface-variant text-right">
                    Cupo disponible
                  </th>
                </tr>
              </thead>
              <tbody>
                {resumen.cupos.map((c) => (
                  <tr key={`${c.distritoName}-${c.oficinaName}`} className="border-b border-outline-variant last:border-0">
                    <td className="px-space-md py-2 font-body-md text-body-md text-on-surface-variant">{c.distritoName}</td>
                    <td className="px-space-md py-2 font-body-md text-body-md text-on-surface">{c.oficinaName}</td>
                    <td
                      className={`px-space-md py-2 font-body-md text-body-md text-right font-bold ${c.cupo < 0 ? "text-error" : "text-on-surface"}`}
                    >
                      {c.cupo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
  );
}
