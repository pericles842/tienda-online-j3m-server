// helpers/auth.ts
import * as bcrypt from "bcryptjs";

/**
 * Encripta la contraseña del usuario
 *
 * @export
 * @param {string} plain
 * @return {*}
 */
export async function hashPassword(plain: string) {
  const saltRounds = 12; // 10-14 es común; 12 es un buen compromiso
  return await bcrypt.hash(plain, saltRounds);
}

/**
 * Compara la contraseña del usuario
 *
 * @export
 * @param {string} pass_plain
 * @param {string} hash
 * @return {boolean}
 */
export async function comparePassword(plain: string, hash: string) {
  return await bcrypt.compare(plain, hash);
}
