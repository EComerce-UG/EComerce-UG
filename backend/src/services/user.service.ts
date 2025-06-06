import { UserRepository } from '../repositories/user.repository.js'
import { UserModel } from '../models/user.model.js'
import { hashPassword } from '../utils/bcrypt.js'
import { ProductModel } from '../models/product.model.js'

export const userService = {
    async create(user: UserModel): Promise<string> {
        // No incluimos id, lo genera Firestore
        const userToSave = {
            ...user,
            password: await hashPassword(user.password),
        }
        return UserRepository.create(userToSave as UserModel)
    },
    async update(id: string, user: Partial<UserModel>): Promise<void> {
        return UserRepository.update(id, user)
    },
    async delete(id: string): Promise<void> {
        return UserRepository.delete(id)
    },
    async getAll(): Promise<UserModel[]> {
        return UserRepository.getAll()
    },
    async getById(id: string): Promise<UserModel | null> {
        return UserRepository.getById(id)
    },
    async getByUsername(username: string): Promise<UserModel | null> {
        return UserRepository.getByUsername(username)
    },
    async addToLikesProductUser(productId:number, id:string): Promise<void> {
      return UserRepository.addToLikesProductUser(productId, id);
    },
    async deleteFromLikesProductUser(productId:number, id: string): Promise<void> {
      return UserRepository.deleteFromLikesProductUser(productId, id);
    },
    async getProductsFromUser(listFromUser:[]): Promise<ProductModel[]> {
      return UserRepository.getProductsFromUser(listFromUser);
    },
    async addCartProductUser(listCartFromUser:[], id:string): Promise<void> {
      return UserRepository.addCartProductUser(listCartFromUser, id);
    },
    async deleteFromCartUser(listCartFromUser:[], id:string): Promise<void> {
      return UserRepository.deleteFromCartUser(listCartFromUser, id);
    },
    async checkoutCartUser(id:string): Promise<void> {
      return UserRepository.checkoutCartUser(id);
    }
}