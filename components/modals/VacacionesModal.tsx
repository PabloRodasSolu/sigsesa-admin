"use client";

type VacacionesModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function VacacionesModal({ isOpen, onClose }: VacacionesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    {/* Modal Backdrop */}
    <div className="fixed inset-0 bg-primary/20 backdrop-blur-sm z-40 transition-opacity"
      onClick={onClose}></div>
    {/* Modal Container */}
    <div className="relative bg-surface w-full max-w-lg rounded-xl border border-outline-variant shadow-lg z-50 overflow-hidden flex flex-col">
      {/* Modal Header */}
      <div className="flex items-center justify-between px-space-lg py-space-md bg-surface-bright border-b border-outline-variant">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">
          Vacaciones
        </h2>
        <button type="button" onClick={onClose} className="p-space-xs rounded-lg hover:bg-surface-container transition-colors text-on-surface-variant hover:text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim">
          <span className="material-symbols-outlined text-[20px]" data-icon="close">
            close
          </span>
        </button>
      </div>
      {/* Modal Body */}
      <div className="p-space-lg flex flex-col gap-space-lg bg-surface">
        {/* Empleado Field */}
        <div className="flex flex-col gap-space-xs relative">
          <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="empleado">
            Empleado
            <span className="text-error">
              *
            </span>
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]" data-icon="person">
              person
            </span>
            <input className="w-full h-[40px] pl-10 pr-3 rounded-lg border border-outline-variant bg-surface-bright text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/50 focus:border-primary-fixed-dim focus:ring-2 focus:ring-primary-fixed-dim/20 transition-all outline-none" id="empleado" placeholder="Buscar empleado..." type="text" />
          </div>
        </div>
        {/* Date Fields Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          {/* Fecha inicio */}
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="fecha_inicio">
              Fecha inicio
              <span className="text-error">
                *
              </span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]" data-icon="calendar_today">
                calendar_today
              </span>
              <input className="w-full h-[40px] pl-10 pr-3 rounded-lg border border-outline-variant bg-surface-bright text-on-surface font-body-md text-body-md focus:border-primary-fixed-dim focus:ring-2 focus:ring-primary-fixed-dim/20 transition-all outline-none" id="fecha_inicio" type="date" />
            </div>
          </div>
          {/* Fecha fin */}
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="fecha_fin">
              Fecha fin
              <span className="text-error">
                *
              </span>
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]" data-icon="calendar_today">
                calendar_today
              </span>
              <input className="w-full h-[40px] pl-10 pr-3 rounded-lg border border-outline-variant bg-surface-bright text-on-surface font-body-md text-body-md focus:border-primary-fixed-dim focus:ring-2 focus:ring-primary-fixed-dim/20 transition-all outline-none" id="fecha_fin" type="date" />
            </div>
          </div>
        </div>
        {/* Optional: Notes/Comments Field just to show a more complete form structure within the aesthetic */}
        <div className="flex flex-col gap-space-xs mt-space-sm">
          <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="notas">
            Observaciones (Opcional)
          </label>
          <textarea className="w-full p-3 rounded-lg border border-outline-variant bg-surface-bright text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/50 focus:border-primary-fixed-dim focus:ring-2 focus:ring-primary-fixed-dim/20 transition-all outline-none resize-none" id="notas" placeholder="Detalles adicionales..." rows={3}></textarea>
        </div>
      </div>
      {/* Modal Footer */}
      <div className="flex items-center justify-end gap-space-sm px-space-lg py-space-md bg-surface-bright border-t border-outline-variant">
        <button className="h-[40px] px-space-md rounded-lg border border-outline-variant bg-transparent text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim">
          Cancelar
        </button>
        <button className="h-[40px] px-space-md rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim shadow-sm">
          Guardar Vacaciones
        </button>
      </div>
    </div>
    </div>
  );
}
