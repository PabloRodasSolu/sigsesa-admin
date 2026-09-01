import { ColumnType, Generated } from "kysely";

// Refleja exactamente el esquema creado a mano en Postgres. Nada de esto se
// auto-genera: si cambia una columna en la base, este archivo se edita a mano.
// Vive aqui (no adentro de un modulo) porque mas de un modulo lo necesita.

// ---------------------------------------------------------------------------
// auth_* (modulo Auth)
// ---------------------------------------------------------------------------

export interface AuthRolesTable {
  id: Generated<number>;
  code: string;
  name: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export interface AuthUsersTable {
  id: Generated<string>;
  username: string;
  username_normalized: ColumnType<string, never, never>; // columna generada, nunca se escribe
  display_name: string;
  password_hash: string;
  role_id: number;
  distrito_id: number | null;
  is_active: ColumnType<boolean, boolean | undefined, boolean>;
  failed_login_attempts: ColumnType<number, number | undefined, number>;
  locked_until: Date | null;
  last_login_at: Date | null;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, string>;
}

export interface AuthSessionsTable {
  id: Generated<string>;
  user_id: string;
  token_hash: string;
  created_at: ColumnType<Date, string | undefined, never>;
  last_seen_at: ColumnType<Date, string | undefined, string>;
  expires_at: Date;
  revoked_at: Date | null;
  ip_address: string | null;
  user_agent: string | null;
}

export interface AuthLoginAttemptsTable {
  id: Generated<string>;
  user_id: string | null;
  attempted_username: string;
  result: string;
  ip_address: string;
  user_agent: string | null;
  created_at: ColumnType<Date, string | undefined, never>;
}

// ---------------------------------------------------------------------------
// divisiones_* (modulo Divisiones - distritos/oficinas)
// ---------------------------------------------------------------------------

export interface DivisionesDistritosTable {
  id: Generated<number>;
  code: string;
  name: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export interface DivisionesOficinasTable {
  id: Generated<string>;
  distrito_id: number;
  code: string;
  name: string;
  is_active: ColumnType<boolean, boolean | undefined, boolean>;
  created_at: ColumnType<Date, string | undefined, never>;
  cliente_id: string | null;
  cupo: ColumnType<number, number | undefined, number>;
}

export interface DivisionesUsuarioOficinasTable {
  user_id: string;
  oficina_id: string;
}

// ---------------------------------------------------------------------------
// novedades_* + tablas minimas de apoyo (modulo Novedades)
// ---------------------------------------------------------------------------

export interface NovedadesTiposTable {
  id: Generated<number>;
  code: string;
  name: string;
  color: string;
  selector: string;
}

export interface PersonalEmpleadosTable {
  id: Generated<string>;
  codigo: string;
  nombre: string;
  is_active: ColumnType<boolean, boolean | undefined, boolean>;
  created_at: ColumnType<Date, string | undefined, never>;
  dpi: string | null;
  nit: string | null;
  direccion: string | null;
  telefono: string | null;
  distrito_id: number | null;
  oficina_id: string | null;
  estado: ColumnType<string, string | undefined, string>;
}

export interface ClientesTable {
  id: Generated<string>;
  codigo: string;
  nombre: string;
  is_active: ColumnType<boolean, boolean | undefined, boolean>;
  created_at: ColumnType<Date, string | undefined, never>;
  nit: string | null;
}

export interface VehiculosTable {
  id: Generated<string>;
  placa: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export interface NovedadesRegistrosTable {
  id: Generated<string>;
  tipo_id: number;
  oficina_id: string;
  descripcion: string;
  estado: ColumnType<string, string | undefined, string>;
  fecha_cierre: Date | null;
  created_by: string;
  created_at: ColumnType<Date, string | undefined, never>;
  updated_at: ColumnType<Date, string | undefined, string>;
}

export interface NovedadesComentariosTable {
  id: Generated<string>;
  novedad_id: string;
  comentario: string;
  created_by: string;
  created_at: ColumnType<Date, string | undefined, never>;
}

export interface NovedadesEmpleadosTable {
  novedad_id: string;
  empleado_id: string;
}

export interface NovedadesClientesTable {
  novedad_id: string;
  cliente_id: string;
  cantidad_puestos: number | null;
}

export interface NovedadesVehiculosTable {
  novedad_id: string;
  vehiculo_id: string;
}

export interface Database {
  auth_roles: AuthRolesTable;
  auth_users: AuthUsersTable;
  auth_sessions: AuthSessionsTable;
  auth_login_attempts: AuthLoginAttemptsTable;

  divisiones_distritos: DivisionesDistritosTable;
  divisiones_oficinas: DivisionesOficinasTable;
  divisiones_usuario_oficinas: DivisionesUsuarioOficinasTable;

  novedades_tipos: NovedadesTiposTable;
  personal_empleados: PersonalEmpleadosTable;
  clientes: ClientesTable;
  vehiculos: VehiculosTable;
  novedades_registros: NovedadesRegistrosTable;
  novedades_comentarios: NovedadesComentariosTable;
  novedades_empleados: NovedadesEmpleadosTable;
  novedades_clientes: NovedadesClientesTable;
  novedades_vehiculos: NovedadesVehiculosTable;
}
