import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { Database } from "./types";

export const KYSELY = Symbol("KYSELY");

@Global()
@Module({
  providers: [
    {
      provide: KYSELY,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const connectionString = config.getOrThrow<string>("DATABASE_URL");
        const dialect = new PostgresDialect({ pool: new Pool({ connectionString }) });
        return new Kysely<Database>({ dialect });
      },
    },
  ],
  exports: [KYSELY],
})
export class DbModule {}
