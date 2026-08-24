"use client";

type IncrementoPuestosModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function IncrementoPuestosModal({
  isOpen,
  onClose,
}: IncrementoPuestosModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      <div className="relative bg-surface rounded-xl shadow-level-2 border border-surface-container-high w-full max-w-2xl z-50 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-space-lg py-4 border-b border-surface-container-high bg-surface-container-lowest">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            Incremento puestos
          </h2>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-space-lg flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-space-md mb-space-lg">
            <div>
              <label
                className="block font-label-md text-label-md text-on-surface-variant mb-space-sm"
                htmlFor="incremento-cliente"
              >
                Cliente *
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                  search
                </span>
                <input
                  className="w-full h-[40px] pl-10 pr-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:border-transparent transition-shadow"
                  id="incremento-cliente"
                  placeholder="Buscar cliente..."
                  type="text"
                />
              </div>
            </div>
            <div>
              <label
                className="block font-label-md text-label-md text-on-surface-variant mb-space-sm"
                htmlFor="incremento-puestos"
              >
                Puestos *
              </label>
              <input
                className="w-full h-[40px] px-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:border-transparent transition-shadow"
                id="incremento-puestos"
                placeholder="Cantidad"
                type="number"
              />
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-surface-bright border-b border-outline-variant">
              <div className="col-span-8 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Cliente
              </div>
              <div className="col-span-4 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Puestos
              </div>
            </div>
            <div className="divide-y divide-outline-variant">
              <div className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-surface-container-low transition-colors cursor-pointer group">
                <div className="col-span-8 font-body-md text-body-md text-on-surface group-hover:text-primary">
                  Residenciales Amayito
                </div>
                <div className="col-span-4 flex items-center justify-between">
                  <span className="font-body-md text-body-md text-on-surface group-hover:text-primary">
                    3
                  </span>
                  <span className="material-symbols-outlined text-outline group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    check_circle
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-surface-container-low transition-colors cursor-pointer group bg-surface-container-lowest">
                <div className="col-span-8 font-body-md text-body-md text-on-surface">
                  Finca San Sebastián
                </div>
                <div className="col-span-4 font-body-md text-body-md text-on-surface">
                  1
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-space-lg py-4 border-t border-surface-container-high bg-surface-container-lowest flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-outline-variant bg-transparent font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-colors focus:outline-none focus:ring-2 focus:ring-outline-variant"
          >
            Cancelar
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Confirmar Incremento
          </button>
        </div>
      </div>
    </div>
  );
}
