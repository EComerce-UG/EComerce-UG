import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { UserRepository } from '../repositories/user.repository.js'

dotenv.config()

export class AuthService {
    /*
    @body => objeto con usuario y password
    @return -> token de autenticacion valido
    */
   static async getLogginUser(id: string) {
    try {
      const user = await UserRepository.getByUsername(id);
      return user;
    } catch (error:any) {
      throw new Error(error.message)
    }
   }

   static async login(body: any) {
        const { usuario, password } = body
        try {
            const user = await UserRepository.getByUsername(usuario);
            if (!user) {
                throw new Error('Usuario no Encontrado')
            }
            const passValid = await bcrypt.compare(password, user.password)
            if (!passValid) {
                throw new Error('Credenciales Invalidas')
            }
            const token = jwt.sign({
                id: user.id,
                usuario: user.usuario
            }, process.env.JWT_SECRET as string, {
                expiresIn: '2h'
            })
            return { token, user }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}   