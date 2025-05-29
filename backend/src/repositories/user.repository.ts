import { db } from '../config/firebase'
import { User } from '../models/user.model'

const USERS_COLLECTION = 'usuarios'

export const UserRepository = {
    async create(user: User): Promise<string> {
        try {
            // Corregir la lógica: si NO está vacío, significa que SÍ existe
            const userExist = await db.collection(USERS_COLLECTION).where('usuario', '==', user.usuario).get()
            if (!userExist.empty) {
                throw new Error('El usuario ya existe')
            }

            const duplicateName = await db.collection(USERS_COLLECTION)
                .where('nombre', '==', user.nombre)
                .where('apaterno', '==', user.apaterno)
                .get()
            
            if (!duplicateName.empty) {
                throw new Error('El usuario con el mismo nombre ya existe')
            }

            const userRef = db.collection(USERS_COLLECTION).doc()
            await userRef.set(user)
            return userRef.id
        } catch (error: any) {
            throw new Error(`Error al crear el usuario: ${error.message}`)            
        }
    },
    
    async update(id: string, user: Partial<User>): Promise<void> {
        await db.collection(USERS_COLLECTION).doc(id).update(user)
    },
    
    async delete(id: string): Promise<void> {
        await db.collection(USERS_COLLECTION).doc(id).delete()
    },
    
    async getAll(): Promise<User[]> {
        const users = await db.collection(USERS_COLLECTION).get()
        return users.docs.map(doc => ({id: doc.id, ...doc.data() })) as User[]
    }, 
    
    async getById(id: string): Promise<User | null> {
        const user = await db.collection(USERS_COLLECTION).doc(id).get()
        return user.exists ? ({ id: user.id, ...user.data()} as User) : null
    },
    
    async getByUsername(username: string): Promise<User | null> {
        const user = await db.collection(USERS_COLLECTION).where('usuario', '==', username).get()
        return !user.empty ? ({ id: user.docs[0].id, ...user.docs[0].data() } as User) : null
    }
    // getByRol eliminado: ya no se manejan roles en el sistema
}