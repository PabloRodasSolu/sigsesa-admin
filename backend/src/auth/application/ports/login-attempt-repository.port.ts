export type LoginAttemptResult =
  | "success"
  | "bad_password"
  | "user_not_found"
  | "account_disabled"
  | "account_locked"
  | "rate_limited";

export const LOGIN_ATTEMPT_REPOSITORY = Symbol("LOGIN_ATTEMPT_REPOSITORY");

export interface RecordLoginAttemptInput {
  userId: string | null;
  attemptedUsername: string;
  result: LoginAttemptResult;
  ipAddress: string;
  userAgent: string | null;
}

export interface LoginAttemptRepository {
  record(input: RecordLoginAttemptInput): Promise<void>;
}
