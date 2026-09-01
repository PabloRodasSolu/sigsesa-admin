import { redirect } from "next/navigation";

// El middleware ya redirige a /login a cualquiera sin sesion valida antes de que
// esta pagina llegue a ejecutarse - si se ejecuta, es porque ya esta autenticado.
export default function RootPage() {
  redirect("/novedades");
}
