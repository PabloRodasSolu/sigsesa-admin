import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { KYSELY } from "../../../../shared/database/db.module";
import { Database } from "../../../../shared/database/types";
import { User } from "../../../domain/entities/user.entity";
import { UserRepository } from "../../../application/ports/user-repository.port";

function toUser(row: {
  id: string;
  username_normalized: string;
  display_name: string;
  password_hash: string;
  role_id: number;
  distrito_id: number | null;
  is_active: boolean;
  failed_login_attempts: number;
  locked_until: Date | null;
}): User {
  return new User(
    row.id,
    row.username_normalized,
    row.display_name,
    row.password_hash,
    row.role_id,
    row.distrito_id,
    row.is_active,
    row.failed_login_attempts,
    row.locked_until,
  );
}

const USER_COLUMNS = [
  "id",
  "username_normalized",
  "display_name",
  "password_hash",
  "role_id",
  "distrito_id",
  "is_active",
  "failed_login_attempts",
  "locked_until",
] as const;

@Injectable()
export class KyselyUserRepository implements UserRepository {
  constructor(@Inject(KYSELY) private readonly db: Kysely<Database>) {}

  async findById(id: string): Promise<User | null> {
    const row = await this.db
      .selectFrom("auth_users")
      .select(USER_COLUMNS)
      .where("id", "=", id)
      .executeTakeFirst();

    return row ? toUser(row) : null;
  }

  async findByUsernameNormalized(usernameNormalized: string): Promise<User | null> {
    const row = await this.db
      .selectFrom("auth_users")
      .select(USER_COLUMNS)
      .where("username_normalized", "=", usernameNormalized)
      .executeTakeFirst();

    return row ? toUser(row) : null;
  }

  async incrementFailedAttempts(userId: string): Promise<number> {
    // Atomico: el UPDATE ... RETURNING lee y escribe en una sola operacion, sin
    // condicion de carrera si llegan varios intentos fallidos en paralelo.
    const row = await this.db
      .updateTable("auth_users")
      .set((eb) => ({ failed_login_attempts: eb("failed_login_attempts", "+", 1) }))
      .where("id", "=", userId)
      .returning("failed_login_attempts")
      .executeTakeFirstOrThrow();

    return row.failed_login_attempts;
  }

  async resetFailedAttempts(userId: string): Promise<void> {
    await this.db
      .updateTable("auth_users")
      .set({ failed_login_attempts: 0, locked_until: null })
      .where("id", "=", userId)
      .execute();
  }

  async lockUntil(userId: string, until: Date): Promise<void> {
    await this.db.updateTable("auth_users").set({ locked_until: until }).where("id", "=", userId).execute();
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.db
      .updateTable("auth_users")
      .set({ last_login_at: new Date() })
      .where("id", "=", userId)
      .execute();
  }
}
