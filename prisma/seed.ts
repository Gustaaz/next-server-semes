import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const funcoes = ['ROLE_ADMIN', 'ROLE_COODERNADOR', 'ROLE_PROFESSOR']

  const createFuncoesPromises = funcoes.map((funcao) =>
    prisma.funcao.create({
      data: {
        nome: funcao,
      },
    }),
  )

  await Promise.all(createFuncoesPromises)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
