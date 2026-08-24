"use client";

type ServiciosEspecialesModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ServiciosEspecialesModal({ isOpen, onClose }: ServiciosEspecialesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm" onClick={onClose}></div>
    {/* Modal Container */}
    <div className="relative bg-surface w-full max-w-lg rounded-xl modal-shadow border border-outline-variant flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-space-lg py-space-md border-b border-outline-variant bg-surface-bright rounded-t-xl">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">
          Servicios especiales
        </h2>
        <button type="button" onClick={onClose} aria-label="Cerrar modal" className="text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-full p-1">
          <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>
            close
          </span>
        </button>
      </div>
      {/* Content */}
      <div className="p-space-lg flex flex-col gap-space-lg">
        {/* Cliente Field (Autocomplete) */}
        <div className="flex flex-col gap-space-xs relative">
          <label className="font-label-md text-label-md text-on-surface" htmlFor="cliente">
            Cliente
            <span className="text-error">
              *
            </span>
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" style={{ fontSize: '20px' }}>
              search
            </span>
            <input className="w-full h-10 pl-10 pr-3 border border-outline-variant rounded-DEFAULT bg-surface text-on-surface font-body-md text-body-md focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim outline-none transition-colors" id="cliente" placeholder="Buscar cliente..." type="text" />
          </div>
        </div>
        {/* Servicio Field (Free Text) */}
        <div className="flex flex-col gap-space-xs">
          <label className="font-label-md text-label-md text-on-surface" htmlFor="servicio">
            Servicio
            <span className="text-error">
              *
            </span>
          </label>
          <input className="w-full h-10 px-3 border border-outline-variant rounded-DEFAULT bg-surface text-on-surface font-body-md text-body-md focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim outline-none transition-colors" id="servicio" placeholder="Descripción del servicio especial" type="text" />
        </div>
        {/* Fecha Field (Date Selector) */}
        <div className="flex flex-col gap-space-xs">
          <label className="font-label-md text-label-md text-on-surface" htmlFor="fecha">
            Fecha
            <span className="text-error">
              *
            </span>
          </label>
          <div className="relative">
            <input className="w-full h-10 pl-3 pr-10 border border-outline-variant rounded-DEFAULT bg-surface text-on-surface font-body-md text-body-md focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim outline-none transition-colors appearance-none" id="fecha" style={{ colorScheme: 'light' }} type="date" />
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none" style={{ fontSize: '20px' }}>
              calendar_today
            </span>
          </div>
        </div>
      </div>
      {/* Footer / Actions */}
      <div className="flex items-center justify-end gap-space-md px-space-lg py-space-md border-t border-outline-variant bg-surface-bright rounded-b-xl">
        <button className="px-4 py-2 border border-outline-variant rounded-lg text-on-surface bg-transparent hover:bg-surface-container-low font-label-md text-label-md transition-colors">
          Cancelar
        </button>
        <button className="px-4 py-2 rounded-lg text-on-primary bg-primary hover:bg-primary-container font-label-md text-label-md transition-colors shadow-sm">
          Guardar Servicio
        </button>
      </div>
    </div>
    </div>
  );
}
