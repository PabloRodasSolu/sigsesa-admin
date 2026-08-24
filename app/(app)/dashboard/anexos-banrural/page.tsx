export default function AnexosBanruralPage() {
  return (
      <>
      {/* Section Header */}
      <div className="flex justify-between items-center mb-space-lg">
        <h1 className="text-headline-md font-headline-md text-on-surface">
          Anexos Banrural
        </h1>
        <button className="bg-primary text-on-primary px-6 py-2 rounded-md font-label-md text-label-md shadow-sm hover:bg-primary-container transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">
            add
          </span>
          Añadir Anexo
        </button>
      </div>
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)] flex flex-col gap-2">
          <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
            Anexos
          </span>
          <span className="text-headline-lg font-headline-lg text-on-surface">
            3
          </span>
        </div>
        {/* Card 2 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)] flex flex-col gap-2">
          <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
            Total Elementos
          </span>
          <span className="text-headline-lg font-headline-lg text-on-surface">
            32
          </span>
        </div>
        {/* Card 3 */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)] flex flex-col gap-2">
          <span className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
            Utilidad Anual
          </span>
          <span className="text-headline-lg font-headline-lg text-on-surface">
            Q 151,100.00
          </span>
        </div>
        {/* Card 4 (High Contrast) */}
        <div className="bg-primary border border-primary rounded-lg p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)] flex flex-col gap-2 text-on-primary">
          <span className="text-label-sm font-label-sm text-inverse-primary uppercase tracking-wider">
            Utilidad Neta Mensual
          </span>
          <span className="text-headline-lg font-headline-lg text-on-primary">
            Q 12,591.67
          </span>
        </div>
      </div>
      {/* Data Table Section */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.02)] overflow-hidden">
        <div className="bg-surface-bright px-space-md py-4 border-b border-outline-variant">
          <h3 className="text-headline-sm font-headline-sm text-on-surface">
            Detalle de Anexos
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-lowest border-b border-outline-variant">
                <th className="py-3 px-4 text-label-sm font-label-sm text-on-surface-variant font-semibold uppercase tracking-wider">
                  Concepto
                </th>
                <th className="py-3 px-4 text-label-sm font-label-sm text-on-surface-variant font-semibold uppercase tracking-wider text-right">
                  Cant
                </th>
                <th className="py-3 px-4 text-label-sm font-label-sm text-on-surface-variant font-semibold uppercase tracking-wider text-right">
                  Precio Fac. (c/IVA)
                </th>
                <th className="py-3 px-4 text-label-sm font-label-sm text-on-surface-variant font-semibold uppercase tracking-wider text-right">
                  Ingreso s/IVA
                </th>
                <th className="py-3 px-4 text-label-sm font-label-sm text-on-surface-variant font-semibold uppercase tracking-wider text-right">
                  Costo Operativo
                </th>
                <th className="py-3 px-4 text-label-sm font-label-sm text-on-surface-variant font-semibold uppercase tracking-wider text-right">
                  Utilidad Mensual
                </th>
              </tr>
            </thead>
            <tbody className="text-body-md font-body-md">
              <tr className="border-b border-outline-variant hover:bg-surface-bright transition-colors">
                <td className="py-4 px-4 text-on-surface font-medium">
                  Supervisores de Campo
                </td>
                <td className="py-4 px-4 text-on-surface-variant text-right">
                  4
                </td>
                <td className="py-4 px-4 text-on-surface-variant text-right">
                  Q 15,000.00
                </td>
                <td className="py-4 px-4 text-on-surface-variant text-right">
                  Q 13,392.86
                </td>
                <td className="py-4 px-4 text-error font-medium text-right">
                  Q 10,500.00
                </td>
                <td className="py-4 px-4 text-success font-medium text-right">
                  Q 2,892.86
                </td>
              </tr>
              <tr className="border-b border-outline-variant hover:bg-surface-bright transition-colors">
                <td className="py-4 px-4 text-on-surface font-medium">
                  Coordinador de Logística
                </td>
                <td className="py-4 px-4 text-on-surface-variant text-right">
                  2
                </td>
                <td className="py-4 px-4 text-on-surface-variant text-right">
                  Q 18,500.00
                </td>
                <td className="py-4 px-4 text-on-surface-variant text-right">
                  Q 16,517.86
                </td>
                <td className="py-4 px-4 text-error font-medium text-right">
                  Q 12,000.00
                </td>
                <td className="py-4 px-4 text-success font-medium text-right">
                  Q 4,517.86
                </td>
              </tr>
              <tr className="hover:bg-surface-bright transition-colors">
                <td className="py-4 px-4 text-on-surface font-medium">
                  Personal de Apoyo Técnico
                </td>
                <td className="py-4 px-4 text-on-surface-variant text-right">
                  26
                </td>
                <td className="py-4 px-4 text-on-surface-variant text-right">
                  Q 65,000.00
                </td>
                <td className="py-4 px-4 text-on-surface-variant text-right">
                  Q 58,035.71
                </td>
                <td className="py-4 px-4 text-error font-medium text-right">
                  Q 52,854.76
                </td>
                <td className="py-4 px-4 text-success font-medium text-right">
                  Q 5,180.95
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </>
  );
}
