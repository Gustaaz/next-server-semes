import { UserRepository } from '@/repositories/user-repository'
import { RoleRepository } from '@/repositories/role-repository'
import { generatePasswordHash } from '@/utils/hash'
import type { CreateUser } from '@/types/create-user'

export class UserService {
  private userRepository: UserRepository
  private roleRepository: RoleRepository

  constructor() {
    this.userRepository = new UserRepository()
    this.roleRepository = new RoleRepository()
  }

  async createUser(data: CreateUser) {
    const { email, senha, funcoes, ...rest } = data
    const hashedPassword = generatePasswordHash(senha, email)

    const [user, roles] = await Promise.all([
      this.userRepository.upsertUser({
        ...rest,
        email,
        senha: hashedPassword,
      }),
      this.roleRepository.findRolesByName(funcoes),
    ])

    const rolesIds = roles.map((role) => role.id)

    if (!rolesIds || rolesIds.length === 0) {
      throw new Error('Funções inválidas')
    }

    await this.userRepository.updateUserRoles(user.id, rolesIds)

    return { id: user.id }
  }

  async getAllUsers() {
    return this.userRepository.getAllUsers()
  }
}
