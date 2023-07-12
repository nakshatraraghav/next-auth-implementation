import argon from "argon2";

export default async function hashPassword(password: string) {
  return argon.hash(password);
}
