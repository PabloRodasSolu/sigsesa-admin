import { NextRequest, NextResponse } from "next/server";

const BACKEND_INTERNAL_URL = process.env.BACKEND_INTERNAL_URL ?? "http://localhost:3001";

interface ValidatedSession {
  userId: string;
  displayName: string;
  roleId: number;
}

// Llama directo al backend real (no al /api/* reescrito) - esto corre server-to-server
// dentro del propio proceso de Next.js, nunca en el navegador.
async function validateSession(sid: string | undefined): Promise<ValidatedSession | null> {
  if (!sid) return null;
  try {
    const res = await fetch(`${BACKEND_INTERNAL_URL}/auth/me`, {
      headers: { cookie: `sid=${sid}` },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    // Backend inalcanzable: falla cerrado (se trata como sesion invalida, nunca se
    // asume valida solo porque no se pudo confirmar).
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sid = request.cookies.get("sid")?.value;

  if (pathname === "/login") {
    const session = await validateSession(sid);
    if (session) {
      return NextResponse.redirect(new URL("/novedades", request.url));
    }
    return NextResponse.next();
  }

  const session = await validateSession(sid);
  if (!session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    const response = NextResponse.redirect(loginUrl);
    if (sid) response.cookies.delete("sid");
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-auth-user-id", session.userId);
  requestHeaders.set("x-auth-display-name", encodeURIComponent(session.displayName));
  requestHeaders.set("x-auth-role-id", String(session.roleId));

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
