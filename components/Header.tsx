export default function Header() {
  return (
    <header className="fixed top-0 right-0 h-header_height z-40 bg-surface border-b border-outline-variant flex items-center justify-between px-container-margin w-[calc(100%-240px)] ml-auto">
      <div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded-full px-4 py-2 w-64 focus-within:border-primary-fixed-dim transition-colors">
        <span className="material-symbols-outlined text-on-surface-variant mr-2 text-xl">
          search
        </span>
        <input
          className="bg-transparent border-none outline-none font-body-md text-body-md text-on-surface w-full focus:ring-0 p-0"
          placeholder="Buscar..."
          type="text"
        />
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 font-headline-sm text-headline-sm font-bold text-primary">
        Backoffice Personal
      </div>

      <div className="flex items-center gap-space-lg">
        <div className="flex items-center gap-space-md text-on-surface-variant">
          <button
            type="button"
            className="hover:text-primary transition-opacity active:opacity-70"
            aria-label="Notificaciones"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button
            type="button"
            className="hover:text-primary transition-opacity active:opacity-70"
            aria-label="Configuración"
          >
            <span className="material-symbols-outlined">settings</span>
          </button>
          <button
            type="button"
            className="hover:text-primary transition-opacity active:opacity-70"
            aria-label="Ayuda"
          >
            <span className="material-symbols-outlined">help</span>
          </button>
        </div>
        <div className="h-8 w-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-sm font-bold border border-outline-variant cursor-pointer">
          A
        </div>
      </div>
    </header>
  );
}
