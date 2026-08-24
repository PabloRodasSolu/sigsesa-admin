"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: reemplazar por la llamada real de autenticación
    router.push("/novedades");
  }

  return (
    <div className="bg-surface text-on-surface flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-space-md">
        {/* Brand Header */}
        <div className="text-center mb-space-lg">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary-container text-on-primary mb-space-sm shadow-sm">
            <span
              className="material-symbols-outlined text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              admin_panel_settings
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-primary-container">
            SIGSESA
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
            Rentabilidad
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-surface-container-lowest rounded-xl border border-surface-variant shadow-[0_4px_12px_rgba(0,0,0,0.02)] p-space-lg">
          <form onSubmit={handleSubmit} className="space-y-space-md">
            <div>
              <label
                className="block font-label-md text-label-md text-on-surface mb-space-xs"
                htmlFor="username"
              >
                Usuario
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-on-surface-variant text-xl">
                    person
                  </span>
                </div>
                <input
                  className="block w-full pl-10 h-[40px] rounded-lg border-surface-variant bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim font-body-md text-body-md sm:text-sm"
                  id="username"
                  name="username"
                  placeholder="Ingrese su usuario"
                  type="text"
                />
              </div>
            </div>

            <div>
              <label
                className="block font-label-md text-label-md text-on-surface mb-space-xs"
                htmlFor="password"
              >
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-on-surface-variant text-xl">
                    lock
                  </span>
                </div>
                <input
                  className="block w-full pl-10 h-[40px] rounded-lg border-surface-variant bg-surface-container-lowest text-on-surface focus:ring-2 focus:ring-primary-fixed-dim focus:border-primary-fixed-dim font-body-md text-body-md sm:text-sm"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-space-md">
              <div className="flex items-center">
                <input
                  className="h-4 w-4 text-primary-container focus:ring-primary-fixed-dim border-surface-variant rounded"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                />
                <label
                  className="ml-2 block font-body-md text-body-md text-on-surface-variant"
                  htmlFor="remember-me"
                >
                  Recordarme
                </label>
              </div>
              <div className="text-sm">
                <a
                  className="font-label-md text-label-md text-primary-container hover:text-primary-fixed-dim transition-colors"
                  href="#"
                >
                  ¿Olvidó su contraseña?
                </a>
              </div>
            </div>

            <div className="pt-space-sm">
              <button
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm font-label-md text-label-md text-on-primary bg-primary-container hover:bg-on-primary-fixed-variant focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-fixed-dim transition-colors h-[40px] items-center"
                type="submit"
              >
                Ingresar
              </button>
            </div>
          </form>
        </div>

        <div className="mt-space-lg text-center">
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            © 2024 Backoffice Personal. Sistema de acceso restringido.
          </p>
        </div>
      </div>
    </div>
  );
}
