import { User } from "../../domain/entities/user.entity";

export const USER_REPOSITORY = Symbol("USER_REPOSITORY");

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByUsernameNormalized(usernameNormalized: string): Promise<User | null>;
  incrementFailedAttempts(userId: string): Promise<number>;
  resetFailedAttempts(userId: string): Promise<void>;
  lockUntil(userId: string, until: Date): Promise<void>;
  updateLastLogin(userId: string): Promise<void>;
}
