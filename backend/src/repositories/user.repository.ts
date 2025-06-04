import { db } from '../config/firebase.js'
import { UserModel } from '../models/user.model.js'
import pkg from 'firebase-admin'
import { ProductModel } from '../models/product.model.js';
const { firestore } = pkg;

const USERS_COLLECTION = 'usuarios'
const PRODUCTS_COLLECTION = 'products';

export const UserRepository = {
    async create(user: UserModel): Promise<string> {
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
    
    async update(id: string, user: Partial<UserModel>): Promise<void> {
        await db.collection(USERS_COLLECTION).doc(id).update(user)
    },
    
    async delete(id: string): Promise<void> {
        await db.collection(USERS_COLLECTION).doc(id).delete()
    },
    
    async getAll(): Promise<UserModel[]> {
        const users = await db.collection(USERS_COLLECTION).get()
        return users.docs.map(doc => ({id: doc.id, ...doc.data() })) as UserModel[]
    }, 
    
    async getById(id: string): Promise<UserModel | null> {
        const user = await db.collection(USERS_COLLECTION).doc(id).get()
        return user.exists ? ({ id: user.id, ...user.data()} as UserModel) : null
    },
    
    async getByUsername(username: string): Promise<UserModel | null> {
        const user = await db.collection(USERS_COLLECTION).where('usuario', '==', username).get()
        return !user.empty ? ({ id: user.docs[0].id, ...user.docs[0].data() } as UserModel) : null
    },

    async addToLikesProductUser(productId:number, id:string): Promise<void> {
      const snapshot = db.collection(USERS_COLLECTION).doc(id);
      snapshot.update({
        likes: firestore.FieldValue.arrayUnion(productId)
      }).then(((response) => {
        console.log(response);
      })).catch((error) => {
        console.error(error);
      });
    },

    async deleteFromLikesProductUser(productId:number, id:string): Promise<void> {
      const snapshot = db.collection(USERS_COLLECTION).doc(id);
      snapshot.update({
        likes: firestore.FieldValue.arrayRemove(productId)
      }).then(((response) => {
        console.log(response);
      })).catch((error) => {
        console.error(error);
      });
    },

    async getProductsFromUser(listFromUser:[]):Promise<ProductModel[]> {
      const dataReturn: ProductModel[] = [];
      const snapshot = await db.collection(PRODUCTS_COLLECTION).get()
      listFromUser.forEach((value:number) => {
        snapshot.docs.map((doc) => {
          if(doc.get('id') === value) {
            const data = doc.data() as ProductModel;
            dataReturn.push(data);
          }
        })
      })
      return dataReturn;
    }
}