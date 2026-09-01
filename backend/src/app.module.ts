import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { AppController } from "./app.controller";
import { DbModule } from "./shared/database/db.module";
import { AuthModule } from "./auth/auth.module";
import { DivisionesModule } from "./divisiones/divisiones.module";
import { NovedadesModule } from "./novedades/novedades.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { authConfig } from "./auth/infrastructure/config/auth.config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: authConfig.throttle.ttlMs, limit: authConfig.throttle.limit }]),
    DbModule,
    AuthModule,
    DivisionesModule,
    NovedadesModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
