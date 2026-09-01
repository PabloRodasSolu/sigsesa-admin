"use client";

import { estadoEmpleadoLabel, searchEmpleados, type Empleado } from "@/lib/novedades-api";
import SearchPicker from "./SearchPicker";

interface EmpleadoSelectorModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onConfirm: (empleado: Empleado) => void;
}

// Un solo modal para Altas, Bajas, Permisos, Vacaciones y Faltando - los 5
// comparten exactamente el mismo selector en el sistema real (elegir un
// empleado), solo cambia el título y a qué tipo de novedad queda ligado.
export default function EmpleadoSelectorModal({ isOpen, title, onClose, onConfirm }: EmpleadoSelectorModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative bg-surface rounded-xl shadow-level-2 border border-surface-container-high w-full max-w-2xl z-50 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-space-lg py-4 border-b border-surface-container-high bg-surface-container-lowest">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">{title}</h2>
          <button
            type="button"
            aria-label="Close modal"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-space-lg flex-1 overflow-y-auto">
          <SearchPicker<Empleado>
            label="Empleado"
            placeholder="Buscar por código o nombre..."
            search={searchEmpleados}
            getId={(e) => e.id}
            columns={[
              { header: "Código", cell: (e) => e.codigo },
              { header: "Nombre", cell: (e) => e.nombre },
              { header: "Estado", cell: (e) => estadoEmpleadoLabel(e.estado) },
            ]}
            onSelect={onConfirm}
          />
        </div>
      </div>
    </div>
  );
}
