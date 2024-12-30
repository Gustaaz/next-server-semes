import z from 'zod'

import type { FastifyTypedInstance } from '../types/fastify-typed-instance'
import { createUserSchema } from '@/validations/create-user-schema'
import {
  createUserController,
  getAllUsersController,
} from '@/controllers/user-controller'
import { getAllUsersSchema } from '@/validations/get-all-users-schema'

const tags = ['users']
const basePath = '/users'
export async function userRoutes(app: FastifyTypedInstance) {
  app.post(
    `${basePath}`,
    {
      schema: {
        tags,
        description: 'Create new user',
        body: createUserSchema,
        response: {
          201: z.object({
            message: z.string().default('Usuário criado com sucesso'),
            id: z.number(),
          }),
          400: z.object({
            message: z.string().default('Error'),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, imagem_perfil, nome, senha, ativo, funcoes } = request.body
      const { id } = await createUserController({
        email,
        imagem_perfil,
        nome,
        senha,
        ativo,
        funcoes,
      })

      reply.status(201).send({ message: 'Usuário criado com sucesso', id })
    },
  )

  app.get(
    `${basePath}`,
    {
      schema: {
        tags,
        description: 'Get all users',
        response: {
          200: getAllUsersSchema,
        },
      },
    },
    async (_, reply) => {
      const users = await getAllUsersController()
      reply.send(users)
    },
  )
}
