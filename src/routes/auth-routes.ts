import { z } from 'zod'
import type { FastifyTypedInstance } from '../types/fastify-typed-instance'

export async function authRoutes(app: FastifyTypedInstance) {
  app.post(
    '/login',
    {
      schema: {
        tags: ['auth'],
        description: 'Authenticate user',
        body: z.object({
          email: z.string().email(),
          senha: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { email, senha } = request.body

      // Valide o usuário (substitua por lógica real de autenticação)
      if (email !== 'admin@admin.com' || senha !== 'senha') {
        return reply.code(401).send({ message: 'Credenciais inválidas' })
      }

      // Gere o token
      const token = app.jwt.sign({ email })
      return { token }
    },
  )
}
