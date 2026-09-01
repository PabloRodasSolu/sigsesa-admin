"use client";

import { useState } from "react";
import {
  estadoEmpleadoLabel,
  searchEmpleados,
  searchClientes,
  searchVehiculos,
  type Empleado,
  type Cliente,
  type Vehiculo,
} from "@/lib/novedades-api";
import SearchPicker from "./SearchPicker";

type Kind = "empleado" | "cliente" | "vehiculo";

export type MultiTargetSelection =
  | { kind: "empleado"; empleado: Empleado }
  | { kind: "cliente"; cliente: Cliente }
  | { kind: "vehiculo"; vehiculo: Vehiculo };

interface MultiTargetSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selection: MultiTargetSelection) => void;
}

// Para Supervisiones: puede ligarse a un empleado, un cliente o un vehículo -
// el select de arriba decide cuál de los tres buscadores mostrar.
export default function MultiTargetSelectorModal({ isOpen, onClose, onConfirm }: MultiTargetSelectorModalProps) {
  const [kind, setKind] = useState<Kind>("empleado");

  if (!isOpen) return null;

  function handleClose() {
    setKind("empleado");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm transition-opacity" onClick={handleClose}></div>
      <div className="relative bg-surface rounded-xl shadow-level-2 border border-surface-container-high w-full max-w-2xl z-50 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-space-lg py-4 border-b border-surface-container-high bg-surface-container-lowest">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Supervisiones</h2>
          <button
            type="button"
            aria-label="Close modal"
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-space-lg flex-1 overflow-y-auto space-y-space-md">
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value as Kind)}
            className="h-10 px-3 border border-outline-variant rounded bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim outline-none"
          >
            <option value="empleado">Empleado</option>
            <option value="cliente">Cliente</option>
            <option value="vehiculo">Vehículo</option>
          </select>

          {kind === "empleado" && (
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
              onSelect={(empleado) => onConfirm({ kind: "empleado", empleado })}
            />
          )}
          {kind === "cliente" && (
            <SearchPicker<Cliente>
              label="Cliente"
              placeholder="Buscar por código o nombre..."
              search={searchClientes}
              getId={(c) => c.id}
              columns={[
                { header: "Código", cell: (c) => c.codigo },
                { header: "Cliente", cell: (c) => c.nombre },
              ]}
              onSelect={(cliente) => onConfirm({ kind: "cliente", cliente })}
            />
          )}
          {kind === "vehiculo" && (
            <SearchPicker<Vehiculo>
              label="Vehículo"
              placeholder="Buscar por placa..."
              search={searchVehiculos}
              getId={(v) => v.id}
              columns={[{ header: "Placa", cell: (v) => v.placa }]}
              onSelect={(vehiculo) => onConfirm({ kind: "vehiculo", vehiculo })}
            />
          )}
        </div>
      </div>
    </div>
  );
}
