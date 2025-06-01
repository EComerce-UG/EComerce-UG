export interface ProductModel {
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