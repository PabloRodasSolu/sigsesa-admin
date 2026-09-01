"use client";

import { useEffect, useState } from "react";

interface Column<T> {
  header: string;
  cell: (item: T) => React.ReactNode;
}

interface SearchPickerProps<T> {
  label: string;
  placeholder: string;
  search: (query: string) => Promise<T[]>;
  columns: Column<T>[];
  getId: (item: T) => string;
  selectedId?: string;
  onSelect: (item: T) => void;
}

export default function SearchPicker<T>({
  label,
  placeholder,
  search,
  columns,
  getId,
  selectedId,
  onSelect,
}: SearchPickerProps<T>) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    // Debounce simple - no busca en cada tecla, espera 250ms de silencio.
    // setLoading solo se llama dentro del callback (no sincrono en el efecto)
    // para que no parpadee en cada tecla y para respetar la regla de hooks.
    const handle = setTimeout(() => {
      setLoading(true);
      search(query)
        .then((items) => {
          if (!cancelled) setResults(items);
        })
        .catch(() => {
          if (!cancelled) setResults([]);
        })
        .finally(() => {
          if (!cancelled) setLoading(false);
        });
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const gridCols = columns.map(() => "1fr").join(" ");

  return (
    <div>
      <label className="block font-label-md text-label-md text-on-surface-variant mb-space-sm">
        {label} *
      </label>
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
          search
        </span>
        <input
          className="w-full h-[40px] pl-10 pr-3 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:ring-2 focus:ring-primary-fixed-dim focus:border-transparent transition-shadow"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          type="text"
          autoFocus
        />
      </div>

      <div className="mt-space-md bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
        <div
          className="grid gap-4 px-4 py-3 bg-surface-bright border-b border-outline-variant"
          style={{ gridTemplateColumns: gridCols }}
        >
          {columns.map((col) => (
            <div key={col.header} className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              {col.header}
            </div>
          ))}
        </div>
        <div className="divide-y divide-outline-variant max-h-64 overflow-y-auto">
          {loading && (
            <div className="px-4 py-3 font-body-md text-body-md text-on-surface-variant">Buscando...</div>
          )}
          {!loading && results.length === 0 && (
            <div className="px-4 py-3 font-body-md text-body-md text-on-surface-variant">Sin resultados.</div>
          )}
          {!loading &&
            results.map((item) => {
              const id = getId(item);
              const active = id === selectedId;
              return (
                <div
                  key={id}
                  onClick={() => onSelect(item)}
                  className={`grid gap-4 px-4 py-3 items-center cursor-pointer group hover:bg-surface-container-low transition-colors ${active ? "bg-primary-fixed/40" : ""}`}
                  style={{ gridTemplateColumns: gridCols }}
                >
                  {columns.map((col) => (
                    <div
                      key={col.header}
                      className="font-body-md text-body-md text-on-surface group-hover:text-primary"
                    >
                      {col.cell(item)}
                    </div>
                  ))}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
