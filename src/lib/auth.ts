export const AUTH_COOKIE_NAME = "atlas_session";

export function validatePassword(password: string): boolean {
  const expected = process.env.ATLAS_ADMIN_PASSWORD;
  if (!expected) {
    throw new Error(
      "ATLAS_ADMIN_PASSWORD is not set. Configure it in environment variables.",
    );
  }

  if (expected.length !== password.length) return false;

  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ password.charCodeAt(i);
  }
  return mismatch === 0;
}
