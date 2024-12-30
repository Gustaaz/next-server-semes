// controllers/user-controller.ts
import { UserService } from '@/services/user-service'
import type { CreateUser } from '@/types/create-user'

export async function createUserController(data: CreateUser) {
  const userService = new UserService()
  return userService.createUser(data)
}

export async function getAllUsersController() {
  const userService = new UserService()
  return userService.getAllUsers()
}
