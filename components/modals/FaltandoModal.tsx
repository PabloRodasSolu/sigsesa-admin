"use client";

type FaltandoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FaltandoModal({ isOpen, onClose }: FaltandoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Modal Overlay Backdrop (Implied by the full screen center, but added for context if this was injected) */}
    <div className="fixed inset-0 bg-on-surface/20 backdrop-blur-[2px] z-40 transition-opacity"
      onClick={onClose}></div>
    {/* Modal Container */}
    <div className="relative bg-surface-container-lowest rounded-xl shadow-[0_12px_24px_-4px_rgba(0,0,0,0.08)] w-full max-w-2xl border border-surface-variant flex flex-col overflow-hidden z-50">
      {/* Modal Header */}
      <div className="flex items-center justify-between px-space-lg py-space-md border-b border-surface-variant bg-surface-bright">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">
          Faltando
        </h2>
        <button type="button" onClick={onClose} aria-label="Cerrar modal" className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim">
          <span className="material-symbols-outlined" data-icon="close">
            close
          </span>
        </button>
      </div>
      {/* Modal Body */}
      <div className="p-space-lg flex flex-col gap-space-lg overflow-y-auto max-h-[716px]">
        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          {/* Empleado Autocomplete Field */}
          <div className="flex flex-col gap-space-xs relative">
            <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="empleado">
              Empleado
              <span className="text-error">
                *
              </span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" data-icon="person_search">
                person_search
              </span>
              <input autoComplete="off" className="w-full h-[40px] pl-10 pr-3 rounded border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim transition-colors font-body-md text-body-md placeholder:text-outline" id="empleado" placeholder="Buscar empleado..." type="text" />
            </div>
          </div>
          {/* Fecha Field */}
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="fecha">
              Fecha
              <span className="text-error">
                *
              </span>
            </label>
            <div className="relative">
              <input className="w-full h-[40px] px-3 rounded border border-outline-variant bg-surface-container-lowest text-on-surface focus:outline-none focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim transition-colors font-body-md text-body-md" id="fecha" type="date" />
            </div>
          </div>
        </div>
        {/* Results Table Section */}
        <div className="flex flex-col gap-space-sm mt-space-sm">
          <h3 className="font-label-md text-label-md text-on-surface">
            Resultados
          </h3>
          <div className="rounded border border-surface-variant overflow-hidden bg-surface-container-lowest">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface border-b border-surface-variant">
                <tr>
                  <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-medium w-1/3">
                    Código
                  </th>
                  <th className="py-3 px-4 font-label-sm text-label-sm text-on-surface-variant font-medium w-2/3">
                    Nombre
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-variant">
                {/* Empty State Example (Can be replaced dynamically) */}
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-4 font-body-md text-body-md text-on-surface">
                    EMP-001
                  </td>
                  <td className="py-3 px-4 font-body-md text-body-md text-on-surface">
                    Juan Pérez
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="py-3 px-4 font-body-md text-body-md text-on-surface">
                    EMP-002
                  </td>
                  <td className="py-3 px-4 font-body-md text-body-md text-on-surface">
                    María Gómez
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Modal Footer Actions */}
      <div className="flex items-center justify-end gap-space-md px-space-lg py-space-md border-t border-surface-variant bg-surface-bright">
        <button className="h-[40px] px-6 rounded-lg border border-outline-variant bg-transparent text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim">
          Cancelar
        </button>
        <button className="h-[40px] px-6 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:ring-offset-2 focus:ring-offset-surface-bright">
          Confirmar
        </button>
      </div>
    </div>
    </div>
  );
}
