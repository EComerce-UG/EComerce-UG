import bcrypt from 'bcryptjs';

/**
 * Hashea una contraseña.
 * @param password Contraseña en texto plano
 * @returns Hash de la contraseña
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compara una contraseña en texto con un hash.
 * @param password Contraseña en texto plano
 * @param hashedPassword Hash almacenado en la base de datos
 * @returns true si coinciden, false si no
 */
export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}