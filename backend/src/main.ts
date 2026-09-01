import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(cookieParser());
  // transform:true es lo que convierte el JSON crudo en instancias reales de la
  // clase del DTO - sin esto, @ValidateNested (usado en CreateNovedadRequestDto)
  // no valida de verdad los objetos anidados.
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));

  // Defensa en profundidad - el mecanismo principal es el proxy same-origin del
  // frontend (next.config.ts rewrites), no depender de esto para las cookies.
  app.enableCors({ origin: config.get<string>("FRONTEND_ORIGIN"), credentials: true });

  const port = config.get<string>("PORT") ?? "3001";
  await app.listen(port);
  console.log(`sigsesa-backend escuchando en http://localhost:${port}`);
}

bootstrap();
