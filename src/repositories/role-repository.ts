import { prisma } from '@/lib/prisma'

export class RoleRepository {
  async findRolesByName(funcoes: string[]) {
    return prisma.funcao.findMany({
      where: { nome: { in: funcoes } },
      select: { id: true },
    })
  }
}
