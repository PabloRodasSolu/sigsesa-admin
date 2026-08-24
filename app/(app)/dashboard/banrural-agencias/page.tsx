export default function BanruralAgenciasPage() {
  return (
      <div className="max-w-7xl mx-auto space-y-space-lg">
        {/* Page Header */}
        <div className="flex justify-between items-end pb-4 border-b border-outline-variant">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Proyecto Banrural - Agencias
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Análisis de facturación e incremento salarial
            </p>
          </div>
          <button className="h-10 px-4 bg-primary text-on-primary rounded-lg font-label-md text-label-md flex items-center gap-2 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: '\'FILL\' 0' }}>
              download
            </span>
            Exportar Reporte
          </button>
        </div>
        {/* KPI Cards (Bento Grid Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          <div className="bg-surface border border-outline-variant rounded-xl p-space-md shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <p className="font-label-md text-label-md text-on-surface-variant mb-4">
              Agentes Desplegados
            </p>
            <div className="flex items-end justify-between">
              <h3 className="font-headline-lg text-headline-lg text-on-surface">
                1,147
              </h3>
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: '\'FILL\' 0' }}>
                person
              </span>
            </div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-space-md shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <p className="font-label-md text-label-md text-orange-800 mb-4">
              Incremento (Ene-Feb)
            </p>
            <div className="flex items-end justify-between">
              <h3 className="font-headline-lg text-headline-lg text-orange-900">
                Q 370,456.16
              </h3>
              <span className="material-symbols-outlined text-orange-600" style={{ fontVariationSettings: '\'FILL\' 0' }}>
                trending_up
              </span>
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-space-md shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <p className="font-label-md text-label-md text-emerald-800 mb-4">
              Incremento (Mar-Dic)
            </p>
            <div className="flex items-end justify-between">
              <h3 className="font-headline-lg text-headline-lg text-emerald-900">
                Q 2,148,165.07
              </h3>
              <span className="material-symbols-outlined text-emerald-600" style={{ fontVariationSettings: '\'FILL\' 0' }}>
                trending_up
              </span>
            </div>
          </div>
          <div className="bg-primary text-on-primary rounded-xl p-space-md shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col justify-between">
            <p className="font-label-md text-label-md text-on-primary opacity-80 mb-4">
              Incremento Total Anual
            </p>
            <div className="flex items-end justify-between">
              <h3 className="font-headline-lg text-headline-lg text-on-primary">
                Q 2,518,621.24
              </h3>
              <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: '\'FILL\' 0' }}>
                account_balance
              </span>
            </div>
          </div>
        </div>
        {/* Table A */}
        <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
          <div className="bg-orange-50 border-b border-orange-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-700">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: '\'FILL\' 0' }}>
                  date_range
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-orange-900">
                8.7% Período: Enero y Febrero
              </h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant font-label-md text-label-md text-on-surface-variant">
                  <th className="py-3 px-4 font-medium whitespace-nowrap">
                    Circunscripción
                  </th>
                  <th className="py-3 px-4 font-medium whitespace-nowrap w-24">
                    Cant AS
                  </th>
                  <th className="py-3 px-4 font-medium whitespace-nowrap text-right">
                    Facturación
                  </th>
                  <th className="py-3 px-4 font-medium whitespace-nowrap text-right">
                    Ingreso s/IVA
                  </th>
                  <th className="py-3 px-4 font-medium whitespace-nowrap text-right text-red-600">
                    Costo Cargas
                  </th>
                  <th className="py-3 px-4 font-medium whitespace-nowrap text-right text-emerald-600">
                    Margen Útil
                  </th>
                  <th className="py-3 px-4 font-medium whitespace-nowrap text-right">
                    Total Incremento
                  </th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md text-on-surface divide-y divide-outline-variant">
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="py-3 px-4 whitespace-nowrap">
                    AS - Banrural - Guatemala
                  </td>
                  <td className="py-2 px-4">
                    <input className="w-16 h-8 text-center border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-primary focus:border-primary font-body-md" type="number" defaultValue="101" />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right">
                    Q7,759.60
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right">
                    Q6,928.21
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right text-red-600">
                    Q6,884.15
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right text-emerald-600 font-medium">
                    Q124.06
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right font-medium">
                    Q25,060.99
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors bg-surface-bright">
                  <td className="py-3 px-4 whitespace-nowrap">
                    AS - Banrural - Otros Deptos
                  </td>
                  <td className="py-2 px-4">
                    <input className="w-20 h-8 text-center border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-primary focus:border-primary font-body-md" type="number" defaultValue="1046" />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right">
                    Q7,467.76
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right">
                    Q6,667.64
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right text-red-600">
                    Q6,502.54
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right text-emerald-600 font-medium">
                    Q165.10
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right font-medium">
                    Q345,395.18
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Table B */}
        <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
          <div className="bg-emerald-50 border-b border-emerald-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: '\'FILL\' 0' }}>
                  event_available
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-emerald-900">
                10% Período: Marzo a Diciembre
              </h3>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant font-label-md text-label-md text-on-surface-variant">
                  <th className="py-3 px-4 font-medium whitespace-nowrap">
                    Circunscripción
                  </th>
                  <th className="py-3 px-4 font-medium whitespace-nowrap w-24">
                    Cant AS
                  </th>
                  <th className="py-3 px-4 font-medium whitespace-nowrap text-right">
                    Facturación
                  </th>
                  <th className="py-3 px-4 font-medium whitespace-nowrap text-right">
                    Ingreso s/IVA
                  </th>
                  <th className="py-3 px-4 font-medium whitespace-nowrap text-right text-red-600">
                    Costo Cargas
                  </th>
                  <th className="py-3 px-4 font-medium whitespace-nowrap text-right text-emerald-600">
                    Margen Útil
                  </th>
                  <th className="py-3 px-4 font-medium whitespace-nowrap text-right">
                    Total Incremento
                  </th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md text-on-surface divide-y divide-outline-variant">
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="py-3 px-4 whitespace-nowrap">
                    AS - Banrural - Guatemala
                  </td>
                  <td className="py-2 px-4">
                    <input className="w-16 h-8 text-center border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-primary focus:border-primary font-body-md" type="number" defaultValue="105" />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right">
                    Q7,852.41
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right">
                    Q7,011.08
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right text-red-600">
                    Q6,884.15
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right text-emerald-600 font-medium">
                    Q206.93
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right font-medium">
                    Q217,276.87
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors bg-surface-bright">
                  <td className="py-3 px-4 whitespace-nowrap">
                    AS - Banrural - Izabal
                  </td>
                  <td className="py-2 px-4">
                    <input className="w-16 h-8 text-center border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-primary focus:border-primary font-body-md" type="number" defaultValue="56" />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right">
                    Q7,557.07
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right">
                    Q6,747.38
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right text-red-600">
                    Q6,502.54
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right text-emerald-600 font-medium">
                    Q244.84
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right font-medium">
                    Q137,112.60
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors">
                  <td className="py-3 px-4 whitespace-nowrap">
                    AS - Banrural - Quiché
                  </td>
                  <td className="py-2 px-4">
                    <input className="w-16 h-8 text-center border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-primary focus:border-primary font-body-md" type="number" defaultValue="68" />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right">
                    Q7,557.07
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right">
                    Q6,747.38
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right text-red-600">
                    Q6,502.54
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right text-emerald-600 font-medium">
                    Q244.84
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right font-medium">
                    Q166,493.87
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-lowest transition-colors bg-surface-bright">
                  <td className="py-3 px-4 whitespace-nowrap">
                    AS - Banrural - Huehuetenango
                  </td>
                  <td className="py-2 px-4">
                    <input className="w-16 h-8 text-center border border-outline-variant rounded bg-surface focus:ring-2 focus:ring-primary focus:border-primary font-body-md" type="number" defaultValue="140" />
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right">
                    Q7,557.07
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right">
                    Q6,747.38
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right text-red-600">
                    Q6,502.54
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right text-emerald-600 font-medium">
                    Q244.84
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap text-right font-medium">
                    Q342,781.50
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
}
