import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  SECRET_KEY_JWT: z.string(),
  SECRET_KEY_PASSWORD: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data
