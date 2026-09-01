import { Inject, Injectable } from "@nestjs/common";
import { Kysely } from "kysely";
import { KYSELY } from "../../../../shared/database/db.module";
import { Database } from "../../../../shared/database/types";
import {
  LoginAttemptRepository,
  RecordLoginAttemptInput,
} from "../../../application/ports/login-attempt-repository.port";

@Injectable()
export class KyselyLoginAttemptRepository implements LoginAttemptRepository {
  constructor(@Inject(KYSELY) private readonly db: Kysely<Database>) {}

  async record(input: RecordLoginAttemptInput): Promise<void> {
    await this.db
      .insertInto("auth_login_attempts")
      .values({
        user_id: input.userId,
        attempted_username: input.attemptedUsername,
        result: input.result,
        ip_address: input.ipAddress,
        user_agent: input.userAgent,
      })
      .execute();
  }
}
