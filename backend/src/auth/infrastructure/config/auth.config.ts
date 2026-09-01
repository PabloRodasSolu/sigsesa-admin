export const authConfig = {
  session: {
    ttlMs: 8 * 60 * 60 * 1000, // 8 horas
    ttlRememberMeMs: 30 * 24 * 60 * 60 * 1000, // 30 dias
    cookieName: "sid",
  },
  lockout: {
    maxFailedAttempts: 5,
    lockDurationMs: 15 * 60 * 1000, // 15 minutos
  },
  throttle: {
    ttlMs: 60 * 1000,
    limit: 10,
  },
} as const;
