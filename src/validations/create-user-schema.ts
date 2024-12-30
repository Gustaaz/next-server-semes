import { z } from 'zod'

export const createUserSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  senha: z.string(),
  ativo: z.boolean(),
  funcoes: z.array(z.string()),
  imagem_perfil: z.string(),
})
