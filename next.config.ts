import type { NextConfig } from "next";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:3001";

const nextConfig: NextConfig = {
  async rewrites() {
    // Proxy same-origin: el navegador solo le habla a Next.js, nunca directo al
    // backend Nest - asi la cookie de sesion funciona con SameSite=Lax sin CORS.
    return [{ source: "/api/:path*", destination: `${BACKEND_URL}/:path*` }];
  },
};

export default nextConfig;
