import { fetchNovedadesLog, fetchOficinasForUser, fetchTipos } from "@/lib/novedades-server";
import NovedadesClient from "@/components/novedades/NovedadesClient";

export default async function NovedadesPage() {
  const [tipos, log, oficinas] = await Promise.all([fetchTipos(), fetchNovedadesLog(), fetchOficinasForUser()]);

  return <NovedadesClient tipos={tipos} initialLog={log} oficinas={oficinas} />;
}
