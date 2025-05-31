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

export interface User {
  id: '',
  nombre: '',
  apaterno: '',
  direccion: '',
  telefono: '',
  ciudad: '',
  estado: '',
  usuario: '',
  password: '',
  rol: '',
  bloqueado: false,
  intentos: 0,
}