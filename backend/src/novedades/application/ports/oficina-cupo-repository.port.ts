export const OFICINA_CUPO_REPOSITORY = Symbol("OFICINA_CUPO_REPOSITORY");

// Ajusta el cupo (puestos disponibles ahora mismo) de una oficina. delta
// puede ser negativo (Alta, Permiso, Vacaciones, Faltante) o positivo (Baja,
// Incremento de puestos). No vive en el modulo `divisiones` a proposito:
// esto es un efecto secundario de crear una novedad, no una operacion propia
// de administrar oficinas.
export interface OficinaCupoRepository {
  // Ajusta el cupo de la oficina asignada AHORA MISMO a ese empleado
  // (personal_empleados.oficina_id) - no la oficina desde la que se registro
  // la novedad.
  adjustCupoForEmpleado(empleadoId: string, delta: number): Promise<void>;
  // Ajusta el cupo de la oficina propia de ese cliente (divisiones_oficinas
  // enganchada via cliente_id).
  adjustCupoForCliente(clienteId: string, delta: number): Promise<void>;
}
