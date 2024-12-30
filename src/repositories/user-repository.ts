import { prisma } from '@/lib/prisma'

export class UserRepository {
  async upsertUser(data: any) {
    return prisma.usuario.upsert({
      where: { email: data.email },
      create: data,
      update: data,
    })
  }

  async updateUserRoles(userId: number, rolesIds: number[]) {
    return prisma.usuario.update({
      where: { id: userId },
      data: {
        funcoes: {
          connect: rolesIds.map((id) => ({ id })),
        },
      },
    })
  }

  async getAllUsers() {
    return prisma.usuario.findMany({
      select: {
        id: true,
        email: true,
        nome: true,
        ativo: true,
        imagem_perfil: true,
        funcoes: {
          select: {
            nome: true,
          },
        },
      },
      orderBy: {
        nome: 'asc',
      },
    })
  }
}
