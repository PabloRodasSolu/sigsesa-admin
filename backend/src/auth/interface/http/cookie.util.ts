import { Response } from "express";
import { authConfig } from "../../infrastructure/config/auth.config";

// Unico lugar que decide las flags de la cookie de sesion - evita que dos endpoints
// terminen con flags distintas por descuido (ver seccion de seguridad del documento).
export function setSessionCookie(res: Response, rawToken: string, expiresAt: Date): void {
  res.cookie(authConfig.session.cookieName, rawToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export function clearSessionCookie(res: Response): void {
  res.clearCookie(authConfig.session.cookieName, { path: "/" });
}
