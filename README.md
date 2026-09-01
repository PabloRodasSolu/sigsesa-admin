# SIGSESA Admin Panel — Backoffice de Gestión de Personal

Proyecto Next.js (App Router) + TypeScript + Tailwind v4, construido a partir
del export de Stitch AI ("stitch_backoffice_de_gestión_de_personal"), con la
navegación por sidebar + submenú "Gráficos" ya conectada. El login (única
parte con lógica real hasta ahora) tiene un backend NestJS aparte en
`backend/`, con arquitectura limpia por capas, contra una base PostgreSQL
(`sigsesa`) creada a mano — ver `backend/README` implícito en su código y el
documento de análisis del módulo de login.

## Cómo correrlo

Este proyecto son **dos servidores separados** que hay que levantar juntos:
Postgres corriendo localmente, el backend NestJS, y el frontend Next.js.

```bash
# 1. Backend (necesita backend/.env con tu DATABASE_URL - ver backend/.env.example)
cd backend
pnpm install
pnpm run dev        # http://localhost:3001

# 2. Frontend, en otra terminal, desde la raiz del repo
pnpm install
pnpm run dev        # http://localhost:3000
```

Abre http://localhost:3000 — si no tienes sesión, te redirige a `/login` de
verdad (contra el backend, con bloqueo por intentos fallidos y todo). El
`middleware`/`proxy.ts` protege el resto de rutas y las páginas leen el
usuario real a través de headers que deja la validación de sesión.

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

- Conectar los `<select>` de Distrito/Oficina, el editor de texto y "GRABAR"
  a un backend/API real
- Los datos de las 7 pantallas de Gráficos y del Log de Novedades son estáticos
  (los mismos que en el diseño aprobado) — falta conectarlos a datos reales
- Los 2 modales construidos a mano (Altas, Incremento puestos) están
  **pendientes de validación visual con el cliente**, igual que ya se marcó
  en el prompt de Stitch
- Validación de formularios, manejo de errores, estados de carga
