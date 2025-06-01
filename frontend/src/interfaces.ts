export interface ProductList {
  id: number,
  name: string,
  price: number,
  quantityAvailable: number,
  discountPrice: number | null,
  image: string,
  category: string,
  isNew: boolean,
  isSale: boolean,
  colorAvailable: string[],
  rating: number,
  quantityReviews: number,
  productContext: string,
  productDescription: string,
  imagesRoute: string
}

export interface LoginRequest {
  usuario: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}

export interface User {
  id: string
  nombre: string
  apaterno: string
  direccion: string
  telefono: string
  ciudad: string
  estado: string
  usuario: string
  password: string
  rol: string
  bloqueado: boolean
  intentos: 0
  likes: []
}

export interface RegisterRequest {
  nombre: string;
  apaterno: string;
  direccion: string;
  telefono: string;
  ciudad: string;
  estado: string;
  usuario: string;
  password: string;
  likes: [];
}