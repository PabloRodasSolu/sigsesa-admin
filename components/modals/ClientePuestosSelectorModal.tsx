"use client";

import { useState } from "react";
import { createCliente, searchClientes, type Cliente } from "@/lib/novedades-api";
import SearchPicker from "./SearchPicker";

interface ClientePuestosSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (cliente: Cliente, cantidadPuestos: number) => void;
}

export default function ClientePuestosSelectorModal({ isOpen, onClose, onConfirm }: ClientePuestosSelectorModalProps) {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [cantidad, setCantidad] = useState("");

  // "nuevo": el cliente no existe todavia - un formulario corto lo crea y lo
  // deja seleccionado, sin salir del modal. El cupo inicial no se pide aparte:
  // es la misma "cantidad" de aqui abajo la que lo establece al Grabar.
  const [modoNuevo, setModoNuevo] = useState(false);
  const [nuevoCodigo, setNuevoCodigo] = useState("");
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoNit, setNuevoNit] = useState("");
  const [creando, setCreando] = useState(false);
  const [errorNuevo, setErrorNuevo] = useState<string | null>(null);

  if (!isOpen) return null;

  function reset() {
    setCliente(null);
    setCantidad("");
    setModoNuevo(false);
    setNuevoCodigo("");
    setNuevoNombre("");
    setNuevoNit("");
    setErrorNuevo(null);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleConfirm() {
    const n = Number(cantidad);
    if (!cliente || !Number.isInteger(n) || n <= 0) return;
    onConfirm(cliente, n);
    reset();
  }

  async function handleCrearCliente() {
    if (!nuevoCodigo.trim() || !nuevoNombre.trim()) return;
    setCreando(true);
    setErrorNuevo(null);
    try {
      const creado = await createCliente({
        codigo: nuevoCodigo.trim(),
        nombre: nuevoNombre.trim(),
        nit: nuevoNit.trim() || undefined,
      });
      setCliente(creado);
      setModoNuevo(false);
    } catch (err) {
      setErrorNuevo(err instanceof Error ? err.message : "No se pudo crear el cliente.");
    } finally {
      setCreando(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm transition-opacity" onClick={handleClose}></div>
      <div className="relative bg-surface rounded-xl shadow-level-2 border border-surface-container-high w-full max-w-2xl z-50 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-space-lg py-4 border-b border-surface-container-high bg-surface-container-lowest">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Incremento puestos</h2>
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
          {!modoNuevo && (
            <>
              <SearchPicker<Cliente>
                label="Cliente"
                placeholder="Buscar por código o nombre..."
                search={searchClientes}
                getId={(c) => c.id}
                selectedId={cliente?.id}
                columns={[
                  { header: "Código", cell: (c) => c.codigo },
                  { header: "Cliente", cell: (c) => c.nombre },
                ]}
                onSelect={setCliente}
              />
              <button
                type="button"
                onClick={() => setModoNuevo(true)}
                className="font-label-sm text-label-sm text-primary hover:text-primary-fixed-dim transition-colors"
              >
                ¿No lo encuentras? Registrar cliente nuevo
              </button>
            </>
          )}

          {modoNuevo && (
            <div className="space-y-space-md">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface">Cliente nuevo</span>
                <button
                  type="button"
                  onClick={() => {
                    setModoNuevo(false);
                    setErrorNuevo(null);
                  }}
                  className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors"
                >
                  Volver a buscar
                </button>
              </div>

              {errorNuevo && (
                <div className="rounded-lg bg-error-container text-on-error-container font-body-md text-body-md px-4 py-3">
                  {errorNuevo}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-space-sm" htmlFor="cliente-codigo">
                    Código *
                  </label>
                  <input
                    id="cliente-codigo"
                    value={nuevoCodigo}
                    onChange={(e) => setNuevoCodigo(e.target.value)}
                    className="w-full h-[40px] px-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface-variant mb-space-sm" htmlFor="cliente-nit">
                    NIT
                  </label>
                  <input
                    id="cliente-nit"
                    value={nuevoNit}
                    onChange={(e) => setNuevoNit(e.target.value)}
                    className="w-full h-[40px] px-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
                  />
                </div>
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface-variant mb-space-sm" htmlFor="cliente-nombre">
                  Nombre *
                </label>
                <input
                  id="cliente-nombre"
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  className="w-full h-[40px] px-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCrearCliente}
                  disabled={creando || !nuevoCodigo.trim() || !nuevoNombre.trim()}
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creando ? "Creando..." : "Crear cliente"}
                </button>
              </div>
            </div>
          )}

          {!modoNuevo && (
            <div>
              <label
                className="block font-label-md text-label-md text-on-surface-variant mb-space-sm"
                htmlFor="cantidad-puestos"
              >
                Puestos *
              </label>
              <input
                id="cantidad-puestos"
                type="number"
                min={1}
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                className="w-32 h-[40px] px-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim"
              />
            </div>
          )}
        </div>
        {!modoNuevo && (
          <div className="px-space-lg py-4 border-t border-surface-container-high bg-surface-container-lowest flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-lg border border-outline-variant bg-transparent font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!cliente || !cantidad}
              className="px-4 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Agregar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
