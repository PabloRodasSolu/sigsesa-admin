export default function InstitucionalesPage() {
  return (
      <>
      {/* Header Section */}
      <div className="flex justify-between items-end mb-space-lg">
        <div>
          <h2 className="text-headline-lg font-headline-lg text-on-surface">
            Cuentas Institucionales
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-1">
            Resumen de rendimiento y utilidades de clientes institucionales.
          </p>
        </div>
        <div className="hidden sm:flex gap-3">
          <button className="px-4 py-2 border border-outline-variant text-on-surface bg-transparent hover:bg-surface-container rounded-lg text-label-md font-label-md transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">
              download
            </span>
            Exportar Reporte
          </button>
        </div>
      </div>
      {/* KPI Row (4 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-space-xl">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[120px]">
          <div className="flex justify-between items-start">
            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
              Institucionales
            </span>
            <div className="p-1.5 bg-secondary-container text-on-secondary-container rounded-md">
              <span className="material-symbols-outlined text-[20px]">
                domain
              </span>
            </div>
          </div>
          <div className="text-headline-md font-headline-md text-on-surface">
            2
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[120px]">
          <div className="flex justify-between items-start">
            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
              Total Agentes (AS)
            </span>
            <div className="p-1.5 bg-secondary-container text-on-secondary-container rounded-md">
              <span className="material-symbols-outlined text-[20px]">
                group
              </span>
            </div>
          </div>
          <div className="text-headline-md font-headline-md text-on-surface">
            215
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[120px]">
          <div className="flex justify-between items-start">
            <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
              Utilidad Anual
            </span>
            <div className="p-1.5 bg-secondary-container text-on-secondary-container rounded-md">
              <span className="material-symbols-outlined text-[20px]">
                payments
              </span>
            </div>
          </div>
          <div className="text-headline-md font-headline-md text-on-surface">
            Q 1,725,226.09
          </div>
        </div>
        {/* Card 4 (Must have dark navy background) */}
        <div className="bg-primary-container border border-primary-container rounded-xl p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[120px]">
          <div className="flex justify-between items-start">
            <span className="text-label-sm font-label-sm text-on-primary-container uppercase tracking-wider">
              Utilidad Neta Mensual
            </span>
            <div className="p-1.5 bg-primary/20 text-on-primary rounded-md">
              <span className="material-symbols-outlined text-[20px]">
                trending_up
              </span>
            </div>
          </div>
          <div className="text-headline-md font-headline-md text-on-primary">
            Q 143,768.84
          </div>
        </div>
      </div>
      {/* Content Area: Filter & Table */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-[0_4px_4px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Toolbar / Filter */}
        <div className="p-space-md bg-surface border-b border-outline-variant flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-headline-sm font-headline-sm text-on-surface font-semibold">
            Detalle de Utilidades
          </h3>
          {/* Segmented Control for Region Filter */}
          <div className="flex bg-surface-container rounded-lg p-1">
            <button className="px-4 py-1.5 rounded-md bg-surface-container-lowest text-on-surface text-label-md font-label-md shadow-sm transition-all font-semibold">
              Metropolitana
            </button>
            <button className="px-4 py-1.5 rounded-md text-on-surface-variant text-label-md font-label-md hover:text-on-surface transition-all">
              Interior
            </button>
          </div>
        </div>
        {/* Data Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[800px]">
            {/* Dark Navy Header as requested */}
            <thead className="bg-primary-container text-on-primary text-label-sm font-label-sm tracking-wider uppercase">
              <tr>
                <th className="px-space-md py-4 font-medium">
                  Cliente Institucional
                </th>
                <th className="px-space-md py-4 font-medium text-right">
                  Volumen AS
                </th>
                <th className="px-space-md py-4 font-medium text-right">
                  Precio c/IVA
                </th>
                <th className="px-space-md py-4 font-medium text-right">
                  Precio s/IVA
                </th>
                <th className="px-space-md py-4 font-medium text-right">
                  Costo Base
                </th>
                <th className="px-space-md py-4 font-medium text-right">
                  Margen Útil
                </th>
                <th className="px-space-md py-4 font-medium text-right rounded-tr-xl">
                  Utilidad Mensual
                </th>
              </tr>
            </thead>
            <tbody className="text-body-md font-body-md text-on-surface divide-y divide-outline-variant">
              {/* Row 1 */}
              <tr className="hover:bg-surface-container-low transition-colors group">
                <td className="px-space-md py-4 font-medium flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-surface-variant flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">
                      account_balance
                    </span>
                  </div>
                  Ministerio de Salud
                </td>
                <td className="px-space-md py-4 text-right">
                  120
                </td>
                <td className="px-space-md py-4 text-right">
                  Q 850.00
                </td>
                <td className="px-space-md py-4 text-right">
                  Q 758.93
                </td>
                <td className="px-space-md py-4 text-right">
                  Q 350.00
                </td>
                <td className="px-space-md py-4 text-right">
                  Q 408.93
                </td>
                <td className="px-space-md py-4 text-right font-semibold text-primary">
                  Q 49,071.60
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-surface-container-low transition-colors group">
                <td className="px-space-md py-4 font-medium flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-surface-variant flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">
                      account_balance
                    </span>
                  </div>
                  Organización Pro-Bienestar
                </td>
                <td className="px-space-md py-4 text-right">
                  65
                </td>
                <td className="px-space-md py-4 text-right">
                  Q 920.00
                </td>
                <td className="px-space-md py-4 text-right">
                  Q 821.43
                </td>
                <td className="px-space-md py-4 text-right">
                  Q 400.00
                </td>
                <td className="px-space-md py-4 text-right">
                  Q 421.43
                </td>
                <td className="px-space-md py-4 text-right font-semibold text-primary">
                  Q 27,392.95
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-surface-container-low transition-colors group">
                <td className="px-space-md py-4 font-medium flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-surface-variant flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-sm">
                      account_balance
                    </span>
                  </div>
                  Entidad Gubernamental X
                </td>
                <td className="px-space-md py-4 text-right">
                  30
                </td>
                <td className="px-space-md py-4 text-right">
                  Q 1,050.00
                </td>
                <td className="px-space-md py-4 text-right">
                  Q 937.50
                </td>
                <td className="px-space-md py-4 text-right">
                  Q 420.00
                </td>
                <td className="px-space-md py-4 text-right">
                  Q 517.50
                </td>
                <td className="px-space-md py-4 text-right font-semibold text-primary">
                  Q 15,525.00
                </td>
              </tr>
            </tbody>
            <tfoot className="bg-surface-container text-body-md font-body-md font-semibold border-t-2 border-outline-variant">
              <tr>
                <td className="px-space-md py-4">
                  Total Metropolitana
                </td>
                <td className="px-space-md py-4 text-right">
                  215
                </td>
                <td colSpan={4}></td>
                <td className="px-space-md py-4 text-right">
                  Q 91,989.55
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      </>
  );
}
