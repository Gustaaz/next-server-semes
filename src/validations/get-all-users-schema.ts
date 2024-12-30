import { z } from 'zod'

export const getAllUsersSchema = z.array(
  z.object({
    id: z.number(),
    email: z.string(),
    nome: z.string(),
    ativo: z.boolean(),
    imagem_perfil: z.string(),
    funcoes: z.array(z.object({ nome: z.string() })),
  }),
)
