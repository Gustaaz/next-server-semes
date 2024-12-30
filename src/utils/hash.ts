import { SHA256 } from 'crypto-js'
import { env } from '@/env'

export function generatePasswordHash(password: string, email: string): string {
  const secretKeyPassword = env.SECRET_KEY_PASSWORD as Object
  return SHA256(password + email, secretKeyPassword).toString()
}
