import type { createUserSchema } from '@/validations/create-user-schema'
import { z } from 'zod'

export type CreateUser = z.infer<typeof createUserSchema>
