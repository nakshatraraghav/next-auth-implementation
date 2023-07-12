import argon from "argon2";

export default function checkPasswords(hashed: string, plain: string) {
  return argon.verify(hashed, plain);
}
