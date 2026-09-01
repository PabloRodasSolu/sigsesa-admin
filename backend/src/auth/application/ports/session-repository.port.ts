import { Session } from "../../domain/entities/session.entity";

export const SESSION_REPOSITORY = Symbol("SESSION_REPOSITORY");

export interface CreateSessionInput {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  ipAddress: string | null;
  userAgent: string | null;
}

export interface SessionRepository {
  create(input: CreateSessionInput): Promise<Session>;
  findByTokenHash(tokenHash: string): Promise<Session | null>;
  revoke(sessionId: string): Promise<void>;
}
