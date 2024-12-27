import z from 'zod'
import type { FastifyTypedInstance } from '../types/fastify-typed-instance'

export async function userRoutes(app: FastifyTypedInstance) {
  app.get(
    '/users',
    {
      schema: {
        tags: ['users'],
        description: 'Get all users',
      },
    },
    async () => {
      return { hello: 'world' }
    },
  )

  app.post(
    '/users',
    {
      schema: {
        tags: ['users'],
        description: 'Create new user',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
      },
    },
    async () => {
      return { hello: 'world' }
    },
  )
}
