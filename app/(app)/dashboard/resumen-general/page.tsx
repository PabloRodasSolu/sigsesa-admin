const DIVISIONES = [
  { label: "Otros Clientes", value: 128075.82, pct: 21.2, color: "#2b83ff" },
  { label: "Institucional", value: 143768.84, pct: 23.8, color: "#7c4dff" },
  { label: "Banrural", value: 209885.1, pct: 34.7, color: "#00b389" },
  { label: "Anexos", value: 12591.67, pct: 2.1, color: "#8bd450" },
  { label: "ESURAM", value: 110852.0, pct: 18.3, color: "#ff8a3d" },
];
const DIVISIONES_MAX_PCT = Math.max(...DIVISIONES.map((d) => d.pct));

const RANKING = [
  { name: "Residenciales Amayito (Motoristas)", value: 3345.23 },
  { name: "Finca San Sebastián (Jefe de grupo)", value: 1051.67 },
  { name: "Quiché Save The Children International", value: 743.0 },
  { name: "Share Guatemala Huehuetenango", value: 658.35 },
  { name: "Share Guatemala Cobán", value: 658.35 },
  { name: "Super Autos Jack II", value: 578.66 },
];
const RANKING_MAX = RANKING[0].value;

function formatQ(value: number) {
  return `Q${value.toLocaleString("es-GT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function ResumenGeneralPage() {
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
              84
            </p>
            <p className="text-label-sm font-label-sm text-secondary mt-1">
              Divisiones: 5
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
              1,770
            </p>
            <p className="text-label-sm font-label-sm text-secondary mt-1">
              Cobertura Nacional
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
              Q 7,262,081.15
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
              Q 605,173.43
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
              {/* Placeholder for actual donut chart */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="none" r="40" stroke="#e1e3e4" strokeWidth="20"></circle>
                <circle cx="50" cy="50" fill="none" r="40" stroke="#001f3f" strokeDasharray="160 251" strokeDashoffset="0" strokeWidth="20"></circle>
                {/* Banrural ~64% */}
                <circle cx="50" cy="50" fill="none" r="40" stroke="#6f88ad" strokeDasharray="40 251" strokeDashoffset="-160" strokeWidth="20"></circle>
                {/* Otros ~16% */}
                <circle cx="50" cy="50" fill="none" r="40" stroke="#d4e3ff" strokeDasharray="30 251" strokeDashoffset="-200" strokeWidth="20"></circle>
                {/* Inst ~12% */}
                <circle cx="50" cy="50" fill="none" r="40" stroke="#004493" strokeDasharray="21 251" strokeDashoffset="-230" strokeWidth="20"></circle>
                {/* ESURAM ~8% */}
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-label-sm font-label-sm text-on-surface-variant uppercase">
                  Total AS
                </span>
                <span className="text-headline-lg font-headline-lg text-on-surface">
                  1,770
                </span>
              </div>
            </div>
            <div className="mt-8 space-y-3">
              <div className="flex justify-between items-center text-body-md font-body-md">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary-container"></span>
                  Banrural Agencias
                </div>
                <span className="font-bold">
                  1,147
                </span>
              </div>
              <div className="flex justify-between items-center text-body-md font-body-md">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-on-primary-container"></span>
                  Otros Clientes
                </div>
                <span className="font-bold">
                  292
                </span>
              </div>
              <div className="flex justify-between items-center text-body-md font-body-md">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary-fixed"></span>
                  Institucionales
                </div>
                <span className="font-bold">
                  215
                </span>
              </div>
              <div className="flex justify-between items-center text-body-md font-body-md">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-on-tertiary-fixed-variant"></span>
                  ESURAM
                </div>
                <span className="font-bold">
                  84
                </span>
              </div>
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
                    Q2,669,721.23
                  </p>
                </div>
                <div className="h-px w-full bg-on-primary opacity-20"></div>
                <div>
                  <p className="text-label-md font-label-md uppercase opacity-80">
                    Otros Clientes
                  </p>
                  <p className="text-headline-lg font-headline-lg text-on-primary mt-1">
                    Q1,536,909.83
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
