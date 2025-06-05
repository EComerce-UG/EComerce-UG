import { ProductModel } from "./product.model.js"

export interface UserModel {
  id: string
  nombre: string
  apaterno: string
  direccion: string
  telefono: string
  ciudad: string
  estado: string
  usuario: string
  password: string
  bloqueado: boolean
  intentos: number
  likes: []
  cart: ProductModel[]
}