# SIGSESA Admin Panel — Backoffice de Gestión de Personal

Proyecto Next.js (App Router) + TypeScript + Tailwind v4, construido a partir
del export de Stitch AI ("stitch_backoffice_de_gestión_de_personal"), con la
navegación por sidebar + submenú "Gráficos" ya conectada.

## Cómo correrlo

```bash
pnpm install
pnpm run dev
```

Abre http://localhost:3000 — te redirige a `/login`. Al enviar el formulario
(sin validación real todavía) te lleva a `/novedades`.

## Estructura

- `app/login/page.tsx` — pantalla de login (fuera del shell, sin sidebar/header)
- `app/(app)/layout.tsx` — shell persistente (Sidebar + Header) para el resto del sistema
- `app/(app)/novedades/page.tsx` — formulario de Novedades, con los 11 tipos y
  su modal correspondiente ya conectado (clic en un tipo → abre su modal)
- `app/(app)/dashboard/*` — las 7 pantallas de "Gráficos" (Resumen General,
  Otros Clientes, Institucionales, Banrural Agencias, Anexos Banrural, ESURAM,
  Historial). Historial usa Chart.js real (`components` + `useEffect`).
- `components/Sidebar.tsx` / `components/Header.tsx` — shell compartido
- `components/modals/` — los 8 modales de "Tipo de Novedad" (6 vienen del
  export de Stitch, **Altas** e **Incremento puestos** los construí a mano
  siguiendo el mismo patrón visual, ya que no venían en el .zip exportado)

## Pendiente (lógica real, no incluida todavía)

- Autenticación real en `/login` (ahora mismo el submit solo redirige)
- Conectar los `<select>` de Distrito/Oficina, el editor de texto y "GRABAR"
  a un backend/API real
- Los datos de las 7 pantallas de Gráficos y del Log de Novedades son estáticos
  (los mismos que en el diseño aprobado) — falta conectarlos a datos reales
- Los 2 modales construidos a mano (Altas, Incremento puestos) están
  **pendientes de validación visual con el cliente**, igual que ya se marcó
  en el prompt de Stitch
- Validación de formularios, manejo de errores, estados de carga
