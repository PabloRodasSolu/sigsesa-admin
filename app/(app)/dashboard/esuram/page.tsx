export default function EsuramPage() {
  return (
      <>
      {/* Top Controls (Optional context header) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-space-lg gap-4">
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Análisis de Rendimiento Operativo
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Métricas consolidadas de unidades activas.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 h-10 border border-outline-variant rounded-DEFAULT font-label-md text-label-md font-medium text-on-surface bg-surface hover:bg-surface-container transition-colors flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">
              calendar_today
            </span>
            Mes Actual
          </button>
          <button className="px-4 py-2 h-10 rounded-DEFAULT font-label-md text-label-md font-medium text-on-primary bg-primary-container hover:bg-tertiary-container transition-colors flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-sm">
              download
            </span>
            Exportar
          </button>
        </div>
      </div>
      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-lg">
        {/* KPI 1 */}
        <div className="bg-surface rounded-lg border border-outline-variant p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:bg-surface-bright transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="font-label-md text-label-md text-on-surface-variant">
              Grupos Activos
            </span>
            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">
                group_work
              </span>
            </div>
          </div>
          <div>
            <div className="font-headline-lg text-headline-lg text-on-surface font-bold">
              28
            </div>
            <div className="flex items-center gap-1 mt-2 text-primary-fixed-dim">
              <span className="material-symbols-outlined text-xs">
                trending_up
              </span>
              <span className="font-label-sm text-label-sm">
                +2% vs mes anterior
              </span>
            </div>
          </div>
        </div>
        {/* KPI 2 */}
        <div className="bg-surface rounded-lg border border-outline-variant p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:bg-surface-bright transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="font-label-md text-label-md text-on-surface-variant">
              Total Elementos
            </span>
            <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">
                person
              </span>
            </div>
          </div>
          <div>
            <div className="font-headline-lg text-headline-lg text-on-surface font-bold">
              84
            </div>
            <div className="flex items-center gap-1 mt-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-xs">
                drag_handle
              </span>
              <span className="font-label-sm text-label-sm">
                Sin cambios
              </span>
            </div>
          </div>
        </div>
        {/* KPI 3 */}
        <div className="bg-surface rounded-lg border border-outline-variant p-space-md shadow-[0_4px_4px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:bg-surface-bright transition-colors">
          <div className="flex items-center justify-between mb-4">
            <span className="font-label-md text-label-md text-on-surface-variant">
              Utilidad Anual
            </span>
            <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-sm">
                account_balance
              </span>
            </div>
          </div>
          <div>
            <div className="font-headline-md text-headline-md text-on-surface font-bold">
              Q 1,330,224.00
            </div>
            <div className="flex items-center gap-1 mt-2 text-primary-fixed-dim">
              <span className="material-symbols-outlined text-xs">
                trending_up
              </span>
              <span className="font-label-sm text-label-sm">
                Proyección estable
              </span>
            </div>
          </div>
        </div>
        {/* KPI 4 (Dark Theme) */}
        <div className="bg-primary-container rounded-lg border border-primary-container p-space-md shadow-[0_4px_12px_rgba(0,31,63,0.15)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="font-label-md text-label-md text-primary-fixed-dim">
              Utilidad Neta Mensual
            </span>
            <div className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center border border-on-primary-fixed-variant">
              <span className="material-symbols-outlined text-sm">
                payments
              </span>
            </div>
          </div>
          <div>
            <div className="font-headline-md text-headline-md text-on-primary font-bold">
              Q 110,852.00
            </div>
            <div className="flex items-center gap-1 mt-2 text-inverse-primary">
              <span className="material-symbols-outlined text-xs">
                check_circle
              </span>
              <span className="font-label-sm text-label-sm">
                Objetivo alcanzado
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Content Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
        {/* Panel 1: Parámetros del Grupo */}
        <div className="bg-surface rounded-lg border border-outline-variant shadow-[0_4px_4px_rgba(0,0,0,0.02)] flex flex-col overflow-hidden">
          <div className="bg-surface-bright border-b border-outline-variant p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-DEFAULT bg-secondary-container flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined icon-filled">
                settings_suggest
              </span>
            </div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Parámetros del Grupo
            </h4>
          </div>
          <div className="p-5 flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-center py-2 border-b border-surface-container">
              <span className="font-body-md text-body-md text-on-surface-variant">
                Elementos por grupo
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                3
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-surface-container">
              <span className="font-body-md text-body-md text-on-surface-variant">
                Total Grupos
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                28
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-surface-container">
              <span className="font-body-md text-body-md text-on-surface-variant">
                Turnos asignados
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                24/7 Rotativo
              </span>
            </div>
            <div className="mt-auto pt-4">
              <button className="w-full py-2 border border-outline-variant rounded-DEFAULT font-label-md text-label-md text-primary-container hover:bg-surface-container transition-colors">
                Ver Configuración
              </button>
            </div>
          </div>
        </div>
        {/* Panel 2: Desglose de Gasto Fijo */}
        <div className="bg-surface rounded-lg border border-outline-variant shadow-[0_4px_4px_rgba(0,0,0,0.02)] flex flex-col overflow-hidden">
          <div className="bg-surface-bright border-b border-outline-variant p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-DEFAULT bg-error-container flex items-center justify-center text-on-error-container">
              <span className="material-symbols-outlined icon-filled">
                receipt_long
              </span>
            </div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Desglose de Gasto Fijo
            </h4>
          </div>
          <div className="p-5 flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-center py-2 border-b border-surface-container">
              <span className="font-body-md text-body-md text-on-surface-variant">
                Nómina Base
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                65%
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-surface-container">
              <span className="font-body-md text-body-md text-on-surface-variant">
                Equipamiento
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                15%
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-surface-container">
              <span className="font-body-md text-body-md text-on-surface-variant">
                Logística & Traslados
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                20%
              </span>
            </div>
            {/* Simple visual bar */}
            <div className="mt-4 w-full h-2 rounded-full bg-surface-container flex overflow-hidden">
              <div className="h-full bg-primary-container" style={{ width: '65%' }}></div>
              <div className="h-full bg-secondary" style={{ width: '15%' }}></div>
              <div className="h-full bg-surface-tint" style={{ width: '20%' }}></div>
            </div>
            <div className="mt-auto pt-4">
              <button className="w-full py-2 border border-outline-variant rounded-DEFAULT font-label-md text-label-md text-primary-container hover:bg-surface-container transition-colors">
                Detalle de Gastos
              </button>
            </div>
          </div>
        </div>
        {/* Panel 3: Rentabilidad ESURAM */}
        <div className="bg-surface rounded-lg border border-outline-variant shadow-[0_4px_4px_rgba(0,0,0,0.02)] flex flex-col overflow-hidden">
          <div className="bg-surface-bright border-b border-outline-variant p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-DEFAULT bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant">
              <span className="material-symbols-outlined icon-filled">
                monitoring
              </span>
            </div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Rentabilidad ESURAM
            </h4>
          </div>
          <div className="p-5 flex-1 flex flex-col gap-4">
            <div className="flex justify-between items-center py-2 border-b border-surface-container">
              <span className="font-body-md text-body-md text-on-surface-variant">
                Margen Bruto
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                32.4%
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-surface-container">
              <span className="font-body-md text-body-md text-on-surface-variant">
                Punto de Equilibrio
              </span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Alcanzado
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-surface-container">
              <span className="font-body-md text-body-md text-on-surface-variant">
                Eficiencia Operativa
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold">
                Alta
              </span>
            </div>
            {/* Simple visual graph placeholder */}
            <div className="mt-4 w-full h-12 flex items-end gap-1 opacity-80">
              <div className="w-1/6 bg-surface-container-highest rounded-t-sm h-[40%] hover:bg-surface-tint transition-colors"></div>
              <div className="w-1/6 bg-surface-container-highest rounded-t-sm h-[55%] hover:bg-surface-tint transition-colors"></div>
              <div className="w-1/6 bg-surface-container-highest rounded-t-sm h-[45%] hover:bg-surface-tint transition-colors"></div>
              <div className="w-1/6 bg-surface-container-highest rounded-t-sm h-[70%] hover:bg-surface-tint transition-colors"></div>
              <div className="w-1/6 bg-surface-container-highest rounded-t-sm h-[85%] hover:bg-surface-tint transition-colors"></div>
              <div className="w-1/6 bg-primary-container rounded-t-sm h-[100%] hover:bg-tertiary-container transition-colors"></div>
            </div>
            <div className="mt-auto pt-4">
              <button className="w-full py-2 border border-outline-variant rounded-DEFAULT font-label-md text-label-md text-primary-container hover:bg-surface-container transition-colors">
                Informe Completo
              </button>
            </div>
          </div>
        </div>
      </div>
      </>
  );
}
