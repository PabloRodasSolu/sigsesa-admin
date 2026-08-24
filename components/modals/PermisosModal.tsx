"use client";

type PermisosModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function PermisosModal({ isOpen, onClose }: PermisosModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm" onClick={onClose}></div>
    {/* Modal Backdrop / Container */}
    <div className="relative w-full max-w-md bg-surface-container-lowest rounded-xl shadow-[0_12px_24px_rgba(0,0,0,0.08)] border border-surface-container-highest overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-space-lg py-space-md border-b border-surface-container-highest bg-surface-bright">
        <h2 className="font-headline-sm text-headline-sm text-on-surface m-0">
          Permisos
        </h2>
        <button onClick={onClose} aria-label="Close modal" className="text-on-surface-variant hover:bg-surface-container rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim" type="button">
          <span className="material-symbols-outlined block" data-icon="close">
            close
          </span>
        </button>
      </div>
      {/* Content */}
      <div className="px-space-lg py-space-lg">
        <form className="space-y-space-md">
          {/* Empleado Autocomplete */}
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-space-xs" htmlFor="empleado">
              Empleado
              <span className="text-error">
                *
              </span>
            </label>
            <div className="relative">
              <input autoComplete="off" className="w-full h-10 px-3 py-2 border border-outline-variant rounded-md bg-surface-container-lowest text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim transition-shadow placeholder:text-outline" id="empleado" name="empleado" placeholder="Buscar empleado..." required type="text" />
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-outline pointer-events-none" data-icon="search">
                search
              </span>
            </div>
          </div>
          {/* Tipo de permiso Select */}
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-space-xs" htmlFor="tipo_permiso">
              Tipo de permiso
              <span className="text-error">
                *
              </span>
            </label>
            <div className="relative">
              <select className="w-full h-10 px-3 py-2 border border-outline-variant rounded-md bg-surface-container-lowest text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim transition-shadow appearance-none" id="tipo_permiso" name="tipo_permiso" required>
                <option disabled selected value="">
                  Seleccione un tipo
                </option>
                <option value="vacaciones">
                  Vacaciones
                </option>
                <option value="enfermedad">
                  Enfermedad
                </option>
                <option value="asuntos_propios">
                  Asuntos Propios
                </option>
                <option value="paternidad">
                  Paternidad / Maternidad
                </option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-outline pointer-events-none" data-icon="arrow_drop_down">
                arrow_drop_down
              </span>
            </div>
          </div>
          {/* Fechas Row */}
          <div className="grid grid-cols-2 gap-space-md">
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant mb-space-xs" htmlFor="fecha_inicio">
                Fecha inicio
                <span className="text-error">
                  *
                </span>
              </label>
              <input className="w-full h-10 px-3 py-2 border border-outline-variant rounded-md bg-surface-container-lowest text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim transition-shadow" id="fecha_inicio" name="fecha_inicio" required type="date" />
            </div>
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant mb-space-xs" htmlFor="fecha_fin">
                Fecha fin
                <span className="text-error">
                  *
                </span>
              </label>
              <input className="w-full h-10 px-3 py-2 border border-outline-variant rounded-md bg-surface-container-lowest text-on-surface font-body-md focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim transition-shadow" id="fecha_fin" name="fecha_fin" required type="date" />
            </div>
          </div>
        </form>
      </div>
      {/* Footer Actions */}
      <div className="px-space-lg py-space-md border-t border-surface-container-highest bg-surface-bright flex justify-end gap-space-sm">
        <button className="px-4 py-2 border border-outline-variant rounded-md bg-transparent text-secondary font-label-md hover:bg-surface-container-low transition-colors focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim" type="button">
          Cancelar
        </button>
        <button className="px-4 py-2 border border-transparent rounded-md bg-primary text-on-primary font-label-md hover:bg-primary-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:ring-offset-2 focus:ring-offset-surface" type="submit">
          Guardar
        </button>
      </div>
    </div>
    </div>
  );
}
