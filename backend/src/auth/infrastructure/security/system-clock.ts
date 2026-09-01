import { Injectable } from "@nestjs/common";
import { Clock } from "../../application/ports/clock.port";

// Separado como su propio port/adapter (en vez de llamar `new Date()` directo en los
// use cases) para poder inyectar un reloj falso en los tests de bloqueo/expiracion.
@Injectable()
export class SystemClock implements Clock {
  now(): Date {
    return new Date();
  }
}
