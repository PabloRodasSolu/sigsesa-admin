"use client";

import { useState } from "react";
import AltasModal from "@/components/modals/AltasModal";
import BajasModal from "@/components/modals/BajasModal";
import FaltandoModal from "@/components/modals/FaltandoModal";
import IncrementoPuestosModal from "@/components/modals/IncrementoPuestosModal";
import PermisosModal from "@/components/modals/PermisosModal";
import ServiciosEspecialesModal from "@/components/modals/ServiciosEspecialesModal";
import SupervisionesModal from "@/components/modals/SupervisionesModal";
import VacacionesModal from "@/components/modals/VacacionesModal";

type ModalKey =
  | "altas"
  | "bajas"
  | "faltando"
  | "incremento_puestos"
  | "permisos"
  | "servicios_especiales"
  | "supervisiones"
  | "vacaciones"
  | null;

type TipoNovedad = {
  label: string;
  colorClass: string;
  modal: ModalKey;
};

// Los 11 tipos de novedad, con su color fijo (igual al panel derecho aprobado)
// y qué modal les corresponde. "Novedades importantes", "Novedades negativo" y
// "Rutinarias" NO abren modal: usan el editor de texto general de la izquierda.
const TIPOS_NOVEDAD: TipoNovedad[] = [
  { label: "Altas", colorClass: "bg-primary", modal: "altas" },
  { label: "Bajas", colorClass: "bg-error", modal: "bajas" },
  { label: "Faltando", colorClass: "bg-secondary", modal: "faltando" },
  { label: "Incremento puestos", colorClass: "bg-primary-fixed-dim", modal: "incremento_puestos" },
  { label: "Novedades importantes", colorClass: "bg-tertiary-fixed-dim", modal: null },
  { label: "Novedades negativo", colorClass: "bg-on-error-container", modal: null },
  { label: "Permisos", colorClass: "bg-on-tertiary-container", modal: "permisos" },
  { label: "Rutinarias", colorClass: "bg-secondary-fixed-dim", modal: null },
  { label: "Servicios especiales", colorClass: "bg-surface-tint", modal: "servicios_especiales" },
  { label: "Supervisiones", colorClass: "bg-on-primary-container", modal: "supervisiones" },
  { label: "Vacaciones", colorClass: "bg-on-secondary-container", modal: "vacaciones" },
];

export default function NovedadesPage() {
  const [selected, setSelected] = useState<string>("Altas");
  const [openModal, setOpenModal] = useState<ModalKey>(null);

  function handleSelect(tipo: TipoNovedad) {
    setSelected(tipo.label);
    setOpenModal(tipo.modal);
  }

  function closeModal() {
    setOpenModal(null);
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
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col gap-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant">
                  DISTRITO *
                </label>
                <select className="h-10 px-3 border border-outline-variant rounded bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim outline-none transition-colors">
                  <option>
                    Seleccionar Distrito
                  </option>
                  <option>
                    Distrito Norte
                  </option>
                  <option>
                    Distrito Sur
                  </option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant">
                  OFICINA *
                </label>
                <select className="h-10 px-3 border border-outline-variant rounded bg-surface-container-lowest font-body-md text-body-md text-on-surface focus:border-primary-fixed-dim focus:ring-1 focus:ring-primary-fixed-dim outline-none transition-colors">
                  <option>
                    Seleccionar Oficina
                  </option>
                  <option>
                    Oficina Central
                  </option>
                  <option>
                    Oficina Anexa
                  </option>
                </select>
              </div>
            </div>
            <div className="border border-outline-variant rounded overflow-hidden mb-6">
              <div className="bg-surface-container py-2 px-3 flex gap-4 border-b border-outline-variant">
                <button className="text-on-surface-variant hover:text-primary font-bold px-2 py-1 rounded hover:bg-surface-variant transition-colors">
                  B
                </button>
                <button className="text-on-surface-variant hover:text-primary italic px-2 py-1 rounded hover:bg-surface-variant transition-colors">
                  I
                </button>
                <button className="text-on-surface-variant hover:text-primary underline px-2 py-1 rounded hover:bg-surface-variant transition-colors">
                  U
                </button>
                <button className="text-on-surface-variant hover:text-primary px-2 py-1 rounded hover:bg-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-sm">
                    mood
                  </span>
                </button>
              </div>
              <textarea className="w-full h-32 p-4 bg-surface-container-lowest font-body-lg text-body-lg text-on-surface border-none focus:ring-0 resize-none outline-none placeholder:text-outline" placeholder="Escribe los detalles de la novedad aquí..."></textarea>
            </div>
            <div className="flex justify-end">
              <button className="bg-transparent border border-outline-variant text-primary font-label-md text-label-md px-6 py-2 rounded-lg hover:bg-surface-variant transition-colors">
                GRABAR
              </button>
            </div>
          </section>
          <section className="flex flex-col gap-4">
            <h3 className="font-headline-sm text-headline-sm text-primary">
              Log de Novedades
            </h3>
            {/* Rutinaria Card */}
            <div className="bg-secondary-container bg-opacity-20 border border-outline-variant rounded-lg p-5 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wide font-bold">
                    RUTINARIA
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant font-bold">
                    Carlos Mendoza
                  </span>
                </div>
                <span className="font-body-md text-body-md text-outline">
                  10:30 AM - Hoy
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface">
                Revisión de turnos matutinos completada sin incidencias mayores. Se adjuntan detalles en el sistema central.
              </p>
              <table className="w-full mt-2 text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant">
                    <th className="font-label-sm text-label-sm text-on-surface-variant pb-2 font-semibold">
                      CÓDIGO
                    </th>
                    <th className="font-label-sm text-label-sm text-on-surface-variant pb-2 font-semibold">
                      NOMBRE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-outline-variant border-opacity-50">
                    <td className="font-body-md text-body-md text-on-surface py-2">
                      RUT-001
                    </td>
                    <td className="font-body-md text-body-md text-on-surface py-2">
                      Control de Acceso
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Baja Card */}
            <div className="bg-error-container bg-opacity-20 border border-outline-variant rounded-lg p-5 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="bg-error text-on-error font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wide font-bold">
                    BAJA
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant font-bold">
                    Ana Silva
                  </span>
                </div>
                <span className="font-body-md text-body-md text-outline">
                  09:15 AM - Hoy
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface">
                Personal reportado enfermo. Ausencia justificada por 48 horas.
              </p>
            </div>
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
              {TIPOS_NOVEDAD.map((tipo) => (
                <label
                  key={tipo.label}
                  className="flex items-center justify-between py-3 border-b border-outline-variant border-dotted cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${tipo.colorClass} transition-opacity ${
                        selected === tipo.label
                          ? "ring-2 ring-offset-2 ring-primary"
                          : "group-hover:opacity-80"
                      }`}
                    ></div>
                    <span
                      className={`font-body-md text-body-md ${
                        selected === tipo.label ? "text-primary font-bold" : "text-on-surface"
                      }`}
                    >
                      {tipo.label}
                    </span>
                  </div>
                  <input
                    checked={selected === tipo.label}
                    onChange={() => handleSelect(tipo)}
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

      <AltasModal isOpen={openModal === "altas"} onClose={closeModal} />
      <BajasModal isOpen={openModal === "bajas"} onClose={closeModal} />
      <FaltandoModal isOpen={openModal === "faltando"} onClose={closeModal} />
      <IncrementoPuestosModal isOpen={openModal === "incremento_puestos"} onClose={closeModal} />
      <PermisosModal isOpen={openModal === "permisos"} onClose={closeModal} />
      <ServiciosEspecialesModal isOpen={openModal === "servicios_especiales"} onClose={closeModal} />
      <SupervisionesModal isOpen={openModal === "supervisiones"} onClose={closeModal} />
      <VacacionesModal isOpen={openModal === "vacaciones"} onClose={closeModal} />
    </>
  );
}
