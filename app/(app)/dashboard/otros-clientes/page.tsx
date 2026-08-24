export default function OtrosClientesPage() {
  return (
      <>
      {/* Section Heading */}
      <div className="mb-space-lg">
        <h3 className="font-headline-sm text-headline-sm text-primary font-semibold">
          Análisis de Otros Clientes
        </h3>
      </div>
      {/* Filters & Actions Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-space-lg bg-surface p-4 rounded-xl border border-outline-variant shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
              search
            </span>
            <input className="w-full pl-9 pr-3 h-[40px] border border-outline-variant rounded-lg text-body-md focus:outline-none focus:ring-2 focus:ring-primary-fixed focus:border-primary-fixed bg-surface-container-lowest transition-all" placeholder="Buscar cliente..." type="text" />
          </div>
          {/* Tab Filters */}
          <div className="flex bg-surface-container-low p-1 rounded-lg border border-outline-variant w-full sm:w-auto">
            <button className="px-4 py-1.5 rounded-md text-label-sm font-medium bg-surface-container-lowest shadow-sm border border-outline-variant/30 text-primary transition-all">
              Todos
            </button>
            <button className="px-4 py-1.5 rounded-md text-label-sm font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container/50 transition-all">
              C1
            </button>
            <button className="px-4 py-1.5 rounded-md text-label-sm font-medium text-on-surface-variant hover:text-primary hover:bg-surface-container/50 transition-all">
              C2
            </button>
          </div>
        </div>
        {/* Primary Action */}
        <button className="bg-primary hover:bg-primary-container text-on-primary px-5 h-[40px] rounded-lg font-label-md text-label-md flex items-center gap-2 transition-colors shadow-sm ml-auto whitespace-nowrap w-full sm:w-auto justify-center">
          <span className="material-symbols-outlined text-[18px]">
            add
          </span>
          Añadir
        </button>
      </div>
      {/* KPI Row (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">
        {/* Card 1 */}
        <div className="bg-surface rounded-xl border border-outline-variant p-space-md shadow-sm flex flex-col justify-between h-[120px]">
          <div className="flex justify-between items-start">
            <span className="font-label-md text-label-md text-on-surface-variant">
              Total Clientes
            </span>
            <span className="material-symbols-outlined text-on-surface-variant/50 text-xl">
              corporate_fare
            </span>
          </div>
          <div className="font-headline-lg text-headline-lg font-bold text-primary">
            80
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-surface rounded-xl border border-outline-variant p-space-md shadow-sm flex flex-col justify-between h-[120px]">
          <div className="flex justify-between items-start">
            <span className="font-label-md text-label-md text-on-surface-variant">
              Total Agentes (AS)
            </span>
            <span className="material-symbols-outlined text-on-surface-variant/50 text-xl">
              shield_person
            </span>
          </div>
          <div className="font-headline-lg text-headline-lg font-bold text-primary">
            292
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-surface rounded-xl border border-outline-variant p-space-md shadow-sm flex flex-col justify-between h-[120px]">
          <div className="flex justify-between items-start">
            <span className="font-label-md text-label-md text-on-surface-variant">
              Utilidad Anual
            </span>
            <span className="material-symbols-outlined text-on-surface-variant/50 text-xl">
              monitoring
            </span>
          </div>
          <div className="font-headline-sm text-[22px] font-bold text-primary tracking-tight">
            Q 1,536,909.83
          </div>
        </div>
        {/* Card 4 (High Contrast Focus) */}
        <div className="bg-primary rounded-xl border border-primary p-space-md shadow-md flex flex-col justify-between h-[120px] relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
          <div className="relative z-10 flex justify-between items-start">
            <span className="font-label-md text-label-md text-primary-fixed">
              Utilidad Neta Mensual
            </span>
            <span
              className="material-symbols-outlined text-primary-fixed/70 text-xl group-hover:scale-110 transition-transform"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
          </div>
          <div className="relative z-10 font-headline-sm text-[22px] font-bold text-on-primary tracking-tight">
            Q 128,075.82
          </div>
        </div>
      </div>
      {/* Data Table Container (Glassmorphism inspired subtle card) */}
      <div className="bg-surface rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
        <div className="bg-surface-bright px-6 py-4 border-b border-outline-variant flex justify-between items-center">
          <h4 className="font-label-sm text-[13px] font-semibold text-on-surface uppercase tracking-wider">
            Detalle Operativo
          </h4>
          <button className="text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">
              more_horiz
            </span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant">
                <th className="px-6 py-3 font-label-sm text-label-sm text-on-surface-variant font-medium">
                  Cliente
                </th>
                <th className="px-6 py-3 font-label-sm text-label-sm text-on-surface-variant font-medium">
                  Región
                </th>
                <th className="px-6 py-3 font-label-sm text-label-sm text-on-surface-variant font-medium text-right">
                  Cant AS
                </th>
                <th className="px-6 py-3 font-label-sm text-label-sm text-on-surface-variant font-medium text-right">
                  Fac. (c/IVA)
                </th>
                <th className="px-6 py-3 font-label-sm text-label-sm text-on-surface-variant font-medium text-right">
                  Precio (s/IVA)
                </th>
                <th className="px-6 py-3 font-label-sm text-label-sm text-on-surface-variant font-medium text-right">
                  Costo Base
                </th>
                <th className="px-6 py-3 font-label-sm text-label-sm text-on-surface-variant font-medium text-right">
                  Margen Útil
                </th>
                <th className="px-6 py-3 font-label-sm text-label-sm text-on-surface-variant font-medium text-right">
                  Utilidad Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40 bg-surface">
              {/* Row 1 */}
              <tr className="hover:bg-surface-container/30 transition-colors group">
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface font-medium">
                  Residenciales San José
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant">
                  Metropolitana
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface text-right">
                  24
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant text-right tabular-nums">
                  Q 45,000.00
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant text-right tabular-nums">
                  Q 40,178.57
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant text-right tabular-nums">
                  Q 32,500.00
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-success font-semibold text-right tabular-nums">
                  Q 7,678.57
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-primary font-semibold text-right tabular-nums">
                  Q 184,285.68
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-surface-container/30 transition-colors group">
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface font-medium">
                  Centro Comercial El Faro
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant">
                  Occidente
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface text-right">
                  42
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant text-right tabular-nums">
                  Q 82,500.00
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant text-right tabular-nums">
                  Q 73,660.71
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant text-right tabular-nums">
                  Q 58,000.00
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-success font-semibold text-right tabular-nums">
                  Q 15,660.71
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-primary font-semibold text-right tabular-nums">
                  Q 375,857.04
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-surface-container/30 transition-colors group">
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface font-medium">
                  Industrias de Alimentos S.A.
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant">
                  Sur
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface text-right">
                  18
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant text-right tabular-nums">
                  Q 38,200.00
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant text-right tabular-nums">
                  Q 34,107.14
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant text-right tabular-nums">
                  Q 28,000.00
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-success font-semibold text-right tabular-nums">
                  Q 6,107.14
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-primary font-semibold text-right tabular-nums">
                  Q 146,571.36
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="hover:bg-surface-container/30 transition-colors group">
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface font-medium">
                  Condominio Las Orquídeas
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant">
                  Metropolitana
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface text-right">
                  12
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant text-right tabular-nums">
                  Q 22,800.00
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant text-right tabular-nums">
                  Q 20,357.14
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant text-right tabular-nums">
                  Q 16,500.00
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-success font-semibold text-right tabular-nums">
                  Q 3,857.14
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-primary font-semibold text-right tabular-nums">
                  Q 92,571.36
                </td>
              </tr>
              {/* Row 5 */}
              <tr className="hover:bg-surface-container/30 transition-colors group">
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface font-medium">
                  Distribuidora Central
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant">
                  Norte
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface text-right">
                  35
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant text-right tabular-nums">
                  Q 68,400.00
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant text-right tabular-nums">
                  Q 61,071.43
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-on-surface-variant text-right tabular-nums">
                  Q 49,000.00
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-success font-semibold text-right tabular-nums">
                  Q 12,071.43
                </td>
                <td className="px-6 py-3 font-body-sm text-[13px] text-primary font-semibold text-right tabular-nums">
                  Q 289,714.32
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>
  );
}
