"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createNovedad,
  estadoEmpleadoLabel,
  type Cliente,
  type Empleado,
  type NovedadRegistroDetallado,
  type NovedadTipo,
  type Oficina,
  type Vehiculo,
} from "@/lib/novedades-api";
import EmpleadoSelectorModal from "@/components/modals/EmpleadoSelectorModal";
import ClientePuestosSelectorModal from "@/components/modals/ClientePuestosSelectorModal";
import MultiTargetSelectorModal, { type MultiTargetSelection } from "@/components/modals/MultiTargetSelectorModal";
import NovedadLogItem from "@/components/novedades/NovedadLogItem";

// Lo que se adjunta a la novedad que se está armando. Los 3 modales
// convergen en esta misma forma - por eso alcanza con un solo slot de estado,
// sin importar cuál de los 3 modales lo llenó.
type Attachment =
  | { kind: "empleado"; empleado: Empleado }
  | { kind: "cliente"; cliente: Cliente; cantidadPuestos?: number }
  | { kind: "vehiculo"; vehiculo: Vehiculo };

function attachmentLabel(a: Attachment): string {
  if (a.kind === "empleado") {
    return `${a.empleado.nombre} (${a.empleado.codigo}) · ${estadoEmpleadoLabel(a.empleado.estado)}`;
  }
  if (a.kind === "cliente") {
    return a.cantidadPuestos
      ? `${a.cliente.nombre} — ${a.cantidadPuestos} puesto(s)`
      : a.cliente.nombre;
  }
  return `Vehículo ${a.vehiculo.placa}`;
}

export default function NovedadesClient({
  tipos,
  initialLog,
  oficinas,
}: {
  tipos: NovedadTipo[];
  initialLog: NovedadRegistroDetallado[];
  oficinas: Oficina[];
}) {
  const router = useRouter();

  const [selectedTipo, setSelectedTipo] = useState<NovedadTipo | null>(null);
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [openModal, setOpenModal] = useState<"empleado" | "cliente_puestos" | "multi" | null>(null);

  const [oficinaId, setOficinaId] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Incremento de puestos ya trae su oficina implícita en el cliente elegido
  // (o recién creado) - pedirla otra vez en el formulario es redundante y
  // confuso, así que para este tipo el selector manual se oculta y se deriva
  // sola del cliente adjunto.
  const esClientePuestos = selectedTipo?.selector === "cliente_puestos";
  const oficinaClienteId = attachment?.kind === "cliente" ? attachment.cliente.oficinaId : null;

  // Bajas/permisos/vacaciones/faltando no reasignan a nadie - actúan sobre la
  // oficina donde el empleado YA está. Solo "Altas" es una asignación nueva y
  // de verdad necesita que el usuario elija a dónde. Pedir Oficina aparte
  // para los otros cuatro es lo mismo que el caso de Incremento de puestos:
  // redundante, y encima dejaba elegir cualquier oficina del usuario en vez
  // de la real del empleado, que es la que de verdad importa para el cupo.
  const esEmpleadoConOficinaFija = selectedTipo?.selector === "empleado" && selectedTipo.code !== "altas";
  const oficinaEmpleadoId = attachment?.kind === "empleado" ? attachment.empleado.oficinaId : null;

  const ocultarSelectorOficina = esClientePuestos || esEmpleadoConOficinaFija;
  const effectiveOficinaId = esClientePuestos ? oficinaClienteId : esEmpleadoConOficinaFija ? oficinaEmpleadoId : oficinaId;

  function handleSelectTipo(tipo: NovedadTipo) {
    setSelectedTipo(tipo);
    setAttachment(null);
    setError(null);

    if (tipo.selector === "empleado") setOpenModal("empleado");
    else if (tipo.selector === "cliente_puestos") setOpenModal("cliente_puestos");
    else if (tipo.selector === "empleado_cliente_vehiculo") setOpenModal("multi");
    else setOpenModal(null);
  }

  function closeModal() {
    setOpenModal(null);
  }

  function handleMultiConfirm(selection: MultiTargetSelection) {
    if (selection.kind === "empleado") setAttachment({ kind: "empleado", empleado: selection.empleado });
    else if (selection.kind === "cliente") setAttachment({ kind: "cliente", cliente: selection.cliente });
    else setAttachment({ kind: "vehiculo", vehiculo: selection.vehiculo });
    closeModal();
  }

  async function handleGrabar() {
    if (!selectedTipo) {
      setError("Selecciona un tipo de novedad.");
      return;
    }
    if (selectedTipo.selector !== "ninguno" && !attachment) {
      setError(`${selectedTipo.name} requiere seleccionar a quién aplica.`);
      return;
    }
    if (esClientePuestos && attachment?.kind === "cliente" && !oficinaClienteId) {
      setError("Este cliente no tiene una oficina asociada todavía. No se puede registrar el incremento.");
      return;
    }
    if (esEmpleadoConOficinaFija && attachment?.kind === "empleado" && !oficinaEmpleadoId) {
      setError(`${attachment.empleado.nombre} no está asignado a ninguna oficina actualmente.`);
      return;
    }
    if (selectedTipo.code === "altas" && attachment?.kind === "empleado" && attachment.empleado.oficinaId) {
      setError(
        `${attachment.empleado.nombre} ya está asignado a ${attachment.empleado.oficinaName ?? "otra oficina"}. Debe darlo de baja primero.`,
      );
      return;
    }
    if (!effectiveOficinaId) {
      setError("Selecciona una oficina.");
      return;
    }
    if (!descripcion.trim()) {
      setError("Escribe una descripción.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await createNovedad({
        tipoId: selectedTipo.id,
        oficinaId: effectiveOficinaId,
        descripcion,
        empleadoIds: attachment?.kind === "empleado" ? [attachment.empleado.id] : undefined,
        clientes:
          attachment?.kind === "cliente"
            ? [{ clienteId: attachment.cliente.id, cantidadPuestos: attachment.cantidadPuestos }]
            : undefined,
        vehiculoIds: attachment?.kind === "vehiculo" ? [attachment.vehiculo.id] : undefined,
      });

      setSelectedTipo(null);
      setAttachment(null);
      setDescripcion("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo grabar la novedad.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Left Column (70%) */}
        <div className="col-span-8 flex flex-col gap-6">
          <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-sm">
            <h2 className="font-headline-md text-headline-md text-primary mb-6">
              Registro de Novedad
            </h2>

            {error && (
              <div className="mb-6 rounded-lg bg-error-container text-on-error-container font-body-md text-body-md px-4 py-3">
                {error}
              </div>
            )}

            {selectedTipo && (
              <div className="mb-6 flex items-center justify-between rounded-lg border border-outline-variant bg-surface-container px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedTipo.color }}></span>
                  <span className="font-label-md text-label-md text-on-surface">{selectedTipo.name}</span>
                  {attachment && (
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      · {attachmentLabel(attachment)}
                    </span>
                  )}
                </div>
                {selectedTipo.selector !== "ninguno" && (
                  <button
                    type="button"
                    onClick={() => handleSelectTipo(selectedTipo)}
                    className="font-label-sm text-label-sm text-primary hover:text-primary-fixed-dim transition-colors"
                  >
                    {attachment ? "Cambiar" : "Seleccionar"}
                  </button>
                )}
              </div>
            )}

            {!ocultarSelectorOficina && (
              <div className="mb-6">
                <div className="flex flex-col gap-2 max-w-sm">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">
                    OFICINA *
                  </label>
                  <select
                    value={oficinaId}
                    onChange={(e) => setOficinaId(e.target.value)}
                    className="h-10 px-3 border border-outline-variant rounded bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim outline-none transition-colors"
                  >
                    <option value="">Seleccionar Oficina</option>
                    {oficinas.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.name} ({o.distritoName})
                      </option>
                    ))}
                  </select>
                  {oficinas.length === 0 && (
                    <p className="font-label-sm text-label-sm text-error">
                      Tu usuario no tiene ninguna oficina asignada todavía.
                    </p>
                  )}
                </div>
              </div>
            )}
            {esClientePuestos && attachment?.kind === "cliente" && (
              <div className="mb-6">
                <div className="flex flex-col gap-2 max-w-sm">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">
                    OFICINA
                  </label>
                  {oficinaClienteId ? (
                    <p className="font-body-md text-body-md text-on-surface">
                      Se usa la oficina propia de {attachment.cliente.nombre}.
                    </p>
                  ) : (
                    <p className="font-label-sm text-label-sm text-error">
                      Este cliente no tiene una oficina asociada todavía.
                    </p>
                  )}
                </div>
              </div>
            )}
            {esEmpleadoConOficinaFija && attachment?.kind === "empleado" && (
              <div className="mb-6">
                <div className="flex flex-col gap-2 max-w-sm">
                  <label className="font-label-sm text-label-sm text-on-surface-variant">
                    OFICINA
                  </label>
                  {oficinaEmpleadoId ? (
                    <p className="font-body-md text-body-md text-on-surface">
                      Se usa la oficina actual de {attachment.empleado.nombre}
                      {attachment.empleado.oficinaName ? `: ${attachment.empleado.oficinaName}` : ""}.
                    </p>
                  ) : (
                    <p className="font-label-sm text-label-sm text-error">
                      {attachment.empleado.nombre} no está asignado a ninguna oficina actualmente.
                    </p>
                  )}
                </div>
              </div>
            )}
            {selectedTipo?.code === "altas" && attachment?.kind === "empleado" && attachment.empleado.oficinaId && (
              <div className="mb-6">
                <p className="font-label-sm text-label-sm text-error">
                  {attachment.empleado.nombre} ya está asignado a {attachment.empleado.oficinaName ?? "otra oficina"}.
                  Debe darlo de baja antes de poder asignarlo a una oficina nueva.
                </p>
              </div>
            )}
            <div className="border border-outline-variant rounded overflow-hidden mb-6">
              <div className="bg-surface-container py-2 px-3 flex gap-4 border-b border-outline-variant">
                <button type="button" className="text-on-surface-variant hover:text-primary font-bold px-2 py-1 rounded hover:bg-surface-variant transition-colors">
                  B
                </button>
                <button type="button" className="text-on-surface-variant hover:text-primary italic px-2 py-1 rounded hover:bg-surface-variant transition-colors">
                  I
                </button>
                <button type="button" className="text-on-surface-variant hover:text-primary underline px-2 py-1 rounded hover:bg-surface-variant transition-colors">
                  U
                </button>
                <button type="button" className="text-on-surface-variant hover:text-primary px-2 py-1 rounded hover:bg-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-sm">mood</span>
                </button>
              </div>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full h-32 p-4 bg-surface-container-lowest font-body-lg text-body-lg text-on-surface border-none focus:ring-0 resize-none outline-none placeholder:text-outline"
                placeholder="Escribe los detalles de la novedad aquí..."
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleGrabar}
                disabled={saving}
                className="bg-transparent border border-outline-variant text-primary font-label-md text-label-md px-6 py-2 rounded-lg hover:bg-surface-variant transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Grabando..." : "GRABAR"}
              </button>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-primary">
                Log de Novedades — Hoy
              </h3>
              <div className="flex items-center gap-2">
                <Link
                  href="/novedades/historial"
                  className="flex items-center gap-2 font-label-sm text-label-sm text-primary border border-outline-variant rounded-lg px-3 py-1.5 hover:bg-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">history</span>
                  Historial
                </Link>
                <a
                  href="/api/novedades/reporte-diario"
                  className="flex items-center gap-2 font-label-sm text-label-sm text-primary border border-outline-variant rounded-lg px-3 py-1.5 hover:bg-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  Reporte del día
                </a>
              </div>
            </div>
            {initialLog.length === 0 && (
              <p className="font-body-md text-body-md text-on-surface-variant">
                Todavía no hay novedades registradas hoy.
              </p>
            )}
            {initialLog.map((n) => (
              <NovedadLogItem key={n.id} n={n} />
            ))}
          </section>
        </div>

        {/* Right Column (30%) */}
        <div className="col-span-4 h-full">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-sm sticky top-6">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-outline-variant bg-surface px-4 -mx-6 -mt-6 pt-6 rounded-t-lg">
              <h3 className="font-headline-sm text-headline-sm text-primary">
                TIPO DE NOVEDAD
              </h3>
              <span className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-primary transition-colors">
                filter_list
              </span>
            </div>
            <div className="flex flex-col gap-0">
              {tipos.map((tipo) => (
                <label
                  key={tipo.id}
                  className="flex items-center justify-between py-3 border-b border-outline-variant border-dotted cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full transition-opacity ${
                        selectedTipo?.id === tipo.id ? "ring-2 ring-offset-2 ring-primary" : "group-hover:opacity-80"
                      }`}
                      style={{ backgroundColor: tipo.color }}
                    ></div>
                    <span
                      className={`font-body-md text-body-md ${
                        selectedTipo?.id === tipo.id ? "text-primary font-bold" : "text-on-surface"
                      }`}
                    >
                      {tipo.name}
                    </span>
                  </div>
                  <input
                    checked={selectedTipo?.id === tipo.id}
                    onChange={() => handleSelectTipo(tipo)}
                    className="hidden"
                    name="tipo_novedad"
                    type="radio"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <EmpleadoSelectorModal
        isOpen={openModal === "empleado"}
        title={selectedTipo?.name ?? "Empleado"}
        onClose={closeModal}
        onConfirm={(empleado) => {
          setAttachment({ kind: "empleado", empleado });
          closeModal();
        }}
      />
      <ClientePuestosSelectorModal
        isOpen={openModal === "cliente_puestos"}
        onClose={closeModal}
        onConfirm={(cliente, cantidadPuestos) => {
          setAttachment({ kind: "cliente", cliente, cantidadPuestos });
          closeModal();
        }}
      />
      <MultiTargetSelectorModal isOpen={openModal === "multi"} onClose={closeModal} onConfirm={handleMultiConfirm} />
    </>
  );
}
