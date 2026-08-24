"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavItem = {
  href: string;
  icon: string;
  label: string;
};

const GRAFICOS_ITEMS: NavItem[] = [
  { href: "/dashboard/resumen-general", icon: "bar_chart", label: "Resumen General" },
  { href: "/dashboard/otros-clientes", icon: "group", label: "Otros Clientes" },
  { href: "/dashboard/institucionales", icon: "account_balance", label: "Institucionales" },
  { href: "/dashboard/banrural-agencias", icon: "store", label: "Banrural Agencias" },
  { href: "/dashboard/anexos-banrural", icon: "add_business", label: "Anexos Banrural" },
  { href: "/dashboard/esuram", icon: "security", label: "ESURAM" },
  { href: "/dashboard/historial", icon: "history", label: "Historial" },
];

const MAIN_ITEMS: NavItem[] = [
  { href: "/novedades", icon: "newspaper", label: "Novedades" },
];

const FOOTER_ITEMS: NavItem[] = [
  { href: "/settings", icon: "settings", label: "Settings" },
  { href: "/help", icon: "help", label: "Help" },
];

function IconLink({
  item,
  active,
  indented = false,
}: {
  item: NavItem;
  active: boolean;
  indented?: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={
        active
          ? "flex items-center gap-3 px-4 py-3 border-l-4 border-primary text-primary font-bold bg-surface-container-low rounded-r-lg"
          : `flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors duration-200 ease-in-out rounded-lg ${indented ? "" : "mx-2"}`
      }
    >
      <span
        className="material-symbols-outlined"
        style={{ fontVariationSettings: `'FILL' ${active ? 1 : 0}` }}
      >
        {item.icon}
      </span>
      <span className="text-body-md font-body-md">{item.label}</span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="fixed left-0 top-0 h-screen w-sidebar_width bg-surface border-r border-outline-variant flex flex-col overflow-y-auto z-50">
      <div className="px-space-md py-space-lg mb-space-sm">
        <h1 className="text-headline-sm font-headline-sm font-bold text-on-surface">
          SIGSESA
        </h1>
        <p className="text-body-md font-body-md text-on-surface-variant">
          Rentabilidad
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto space-y-1 px-space-xs">
        {/* Dashboard (expandible -> submenú "Gráficos" con 7 opciones fijas) */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="w-full flex items-center justify-between gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors duration-200 ease-in-out rounded-lg mx-2"
        >
          <span className="flex items-center gap-3">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: `'FILL' ${isDashboardRoute ? 1 : 0}` }}
            >
              dashboard
            </span>
            <span className="text-body-md font-body-md">Dashboard</span>
          </span>
          <span
            className="material-symbols-outlined text-lg transition-transform duration-200"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            expand_more
          </span>
        </button>

        {expanded && (
          <div className="pl-4 mt-2 mb-2 space-y-1">
            {GRAFICOS_ITEMS.map((item) => (
              <IconLink key={item.href} item={item} active={pathname === item.href} indented />
            ))}
          </div>
        )}

        {MAIN_ITEMS.map((item) => (
          <IconLink key={item.href} item={item} active={pathname === item.href} />
        ))}
      </nav>

      <div className="mt-auto px-space-xs space-y-1 py-space-sm border-t border-outline-variant">
        {FOOTER_ITEMS.map((item) => (
          <IconLink key={item.href} item={item} active={pathname === item.href} />
        ))}
      </div>
    </aside>
  );
}
