import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { KYSELY } from "../../../../shared/database/db.module";
import { Database } from "../../../../shared/database/types";
import { Session } from "../../../domain/entities/session.entity";
import { CreateSessionInput, SessionRepository } from "../../../application/ports/session-repository.port";

function toSession(row: {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: Date;
  revoked_at: Date | null;
}): Session {
  return new Session(row.id, row.user_id, row.token_hash, row.expires_at, row.revoked_at);
}

@Injectable()
export class KyselySessionRepository implements SessionRepository {
  constructor(@Inject(KYSELY) private readonly db: Kysely<Database>) {}

  async create(input: CreateSessionInput): Promise<Session> {
    const row = await this.db
      .insertInto("auth_sessions")
      .values({
        user_id: input.userId,
        token_hash: input.tokenHash,
        expires_at: input.expiresAt,
        ip_address: input.ipAddress,
        user_agent: input.userAgent,
      })
      .returning(["id", "user_id", "token_hash", "expires_at", "revoked_at"])
      .executeTakeFirstOrThrow();

    return toSession(row);
  }

  async findByTokenHash(tokenHash: string): Promise<Session | null> {
    const row = await this.db
      .selectFrom("auth_sessions")
      .select(["id", "user_id", "token_hash", "expires_at", "revoked_at"])
      .where("token_hash", "=", tokenHash)
      .executeTakeFirst();

    return row ? toSession(row) : null;
  }

  async revoke(sessionId: string): Promise<void> {
    await this.db
      .updateTable("auth_sessions")
      .set({ revoked_at: new Date() })
      .where("id", "=", sessionId)
      .execute();
  }
}
