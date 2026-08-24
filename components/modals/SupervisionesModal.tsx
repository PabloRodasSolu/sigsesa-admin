"use client";

type SupervisionesModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SupervisionesModal({ isOpen, onClose }: SupervisionesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Modal Overlay Backdrop (Optional for visual context, but rendering standalone modal as requested) */}
    <div className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-40"
      onClick={onClose}></div>
    {/* Modal Container */}
    <div className="bg-surface rounded-xl border border-outline-variant modal-shadow w-full max-w-4xl flex flex-col z-50 relative overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-space-lg py-space-md border-b border-outline-variant bg-surface-bright">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">
          Supervisiones
        </h2>
        <button type="button" onClick={onClose} aria-label="Close modal" className="text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none rounded-full p-1 hover:bg-surface-container">
          <span className="material-symbols-outlined" data-icon="close">
            close
          </span>
        </button>
      </header>
      {/* Content Body */}
      <div className="p-space-lg flex flex-col gap-space-lg">
        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
          {/* Supervisor Autocomplete */}
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="supervisor">
              Supervisor *
            </label>
            <div className="relative">
              <input className="w-full h-[40px] px-3 py-2 bg-surface border border-outline-variant rounded focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim font-body-md text-body-md text-on-surface placeholder:text-outline outline-none transition-shadow" id="supervisor" placeholder="Buscar supervisor..." type="text" />
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline" data-icon="search">
                search
              </span>
            </div>
          </div>
          {/* Cliente Autocomplete */}
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="cliente">
              Cliente *
            </label>
            <div className="relative">
              <input className="w-full h-[40px] px-3 py-2 bg-surface border border-outline-variant rounded focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim font-body-md text-body-md text-on-surface placeholder:text-outline outline-none transition-shadow" id="cliente" placeholder="Buscar cliente..." type="text" />
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline" data-icon="search">
                search
              </span>
            </div>
          </div>
        </div>
        {/* Results Section */}
        <div className="flex flex-col gap-space-sm border border-outline-variant rounded-lg bg-surface card-shadow overflow-hidden mt-space-sm">
          {/* Table Header */}
          <div className="bg-surface-container-low border-b border-outline-variant px-space-md py-3 grid grid-cols-12 gap-4">
            <div className="col-span-4 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
              Código
            </div>
            <div className="col-span-8 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
              Nombre
            </div>
          </div>
          {/* Table Body */}
          <div className="flex flex-col max-h-[300px] overflow-y-auto">
            {/* Empty State (Placeholder if no search) */}
            <div className="px-space-md py-space-lg flex flex-col items-center justify-center text-center gap-2">
              <span className="material-symbols-outlined text-outline text-4xl" data-icon="manage_search">
                manage_search
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Ingrese los criterios de búsqueda para ver resultados.
              </p>
            </div>
            {/* Example Rows (Hidden by default for semantic structural clarity, un-comment to show populated state) */}
            {/* <div class="px-space-md py-3 grid grid-cols-12 gap-4 border-b border-outline-variant hover:bg-surface-container transition-colors cursor-pointer last:border-b-0">
                            <div class="col-span-4 font-body-md text-body-md text-on-surface font-medium">SUP-2023-001</div>
                            <div class="col-span-8 font-body-md text-body-md text-on-surface-variant">Evaluación de Desempeño Trimestral</div>
                        </div> */}
          </div>
        </div>
      </div>
      {/* Footer Actions (Standard administrative pattern for modals) */}
      <footer className="px-space-lg py-space-md border-t border-outline-variant bg-surface flex justify-end gap-3 mt-auto">
        <button className="h-[40px] px-4 font-label-md text-label-md border border-outline-variant text-on-surface hover:bg-surface-container rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim">
          Cancelar
        </button>
        <button className="h-[40px] px-4 font-label-md text-label-md bg-primary text-on-primary hover:bg-tertiary-container rounded transition-colors focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim shadow-sm">
          Asignar Supervisión
        </button>
      </footer>
    </div>
    </div>
  );
}
