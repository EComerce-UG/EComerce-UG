import { UserRepository } from '../repositories/user.repository'
import { User } from '../models/user.model'
import { hashPassword } from '../utils/bcrypt'

export const userService = {
    async create(user: User): Promise<string> {
        // No incluimos id, lo genera Firestore
        const userToSave = {
            ...user,
            password: await hashPassword(user.password),
        }
        return UserRepository.create(userToSave as User)
    },
    async update(id: string, user: Partial<User>): Promise<void> {
        return UserRepository.update(id, user)
    },
    async delete(id: string): Promise<void> {
        return UserRepository.delete(id)
    },
    async getAll(): Promise<User[]> {
        return UserRepository.getAll()
    },
    async getById(id: string): Promise<User | null> {
        return UserRepository.getById(id)
    },
    async getByUsername(username: string): Promise<User | null> {
        return UserRepository.getByUsername(username)
    },
    async getByRol(rol: string): Promise<User[]> {
        return UserRepository.getByRol(rol)
    }
}