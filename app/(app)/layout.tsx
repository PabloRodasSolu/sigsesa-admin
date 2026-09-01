import { headers } from "next/headers";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const headersList = await headers();
  const displayName = decodeURIComponent(headersList.get("x-auth-display-name") ?? "Usuario");

  return (
    <div className="bg-background text-on-background font-body-md antialiased flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 ml-sidebar_width flex flex-col min-h-screen">
        <Header displayName={displayName} />
        <main className="flex-1 mt-header_height p-container-margin overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
