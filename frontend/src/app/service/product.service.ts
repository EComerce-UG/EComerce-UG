import { Injectable } from '@angular/core';
import { ProductList } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // TO-DO
  // Extraer todos los productos de la base de datos.
  protected temp: ProductList | undefined;

  protected productsListCompleted: ProductList[] = [
    {
      id: 1,
      name: 'Minimal Chair',
      price: 250,
      quantityAvailable: 5,
      discountPrice: 200,
      image: '#',
      category: 'Chairs',
      isNew: true,
      isSale: true,
      colorAvailable: [
        "bg-neutral-500",
        "bg-neutral-200",
      ],
      rating: 5,
      quantityReviews: 120,
      productContext: 'Una cómoda y resistente silla con estructura de metal, un asiento blando y un respaldo con forma curvada. Se caracteriza por un diseño sencillo y atemporal con un toque moderno que ocupa poco espacio a un precio increíble.',
      productDescription: 
      `
        Silla tapizada que distribuye el peso de manera uniforme y reduce las tensiones musculares.
        Es muy fácil de armar, ya que no tienes que preocuparte de las patas que van delante. Son todas iguales.
        Puedes crear un estilo a juego con varias sillas del mismo color o combinar sillas de diferentes colores.
        Un diseño esbelto que se integra en la decoración ocupando poco espacio visual, pero con una estructura robusta que aguanta perfectamente las actividades del día a día.
        La silla no se mueve del sitio gracias al soporte de metal.
        Puedes apilar las sillas para que ocupen menos espacio cuando no las uses.
      `,
      imagesRoute: 'assets/1_silla/'
    },
    {
      id: 2,
      name: 'Modern Sofa',
      price: 450,
      quantityAvailable: 5,
      discountPrice: null,
      image: '#',
      category: 'Sofas',
      isNew: false,
      isSale: false,
      colorAvailable: [
        "bg-neutral-500",
        "bg-neutral-700",
      ],
      rating: 4,
      quantityReviews: 722,
      productContext: 'El sofá cama FRIDHULT se ha diseñado para que ocupe el menor espacio posible y puedas aprovechar al máximo su superficie para dormir. Es ideal si vives en un espacio reducido y quieres aprovechar tu sofá como cama.',
      productDescription: 
      `
        El tamaño compacto y los reposabrazos minimalistas hacen que puedas colocar el sofá cama FRIDHULT en cualquier parte, incluso en espacios reducidos, y puedas aprovechar su superficie para dormir.
        Este sofá se transforma fácilmente en cama. Y se vuelve a convertir en un sofá igual de rápido.
        El aspecto de madera de las patas aporta un toque acogedor al sofá y, como la parte posterior luce un bonito acabado, puedes colocarlo en mitad de la estancia si lo prefieres.
        El marco tiene una garantía de 10 años. Consulta los términos y condiciones en el folleto de la garantía.
      `,
      imagesRoute: 'assets/2_sofa/'
    },
    {
      id: 3,
      name: 'Wooden Table',
      price: 350,
      quantityAvailable: 5,
      discountPrice: 300,
      image: '#',
      category: 'Tables',
      isNew: true,
      isSale: true,
      colorAvailable: [
        "bg-yellow-100",
      ],
      rating: 5,
      quantityReviews: 55,
      productContext: 'Combina el aspecto cálido y natural de la madera con un diseño bonito y sencillo. Esta innovadora estructura es muy resistente y con unos clicks se arma la mesa y queda lista para usarse.',
      productDescription: 
      `
        Su estructura inteligente y aspecto artesanal han conseguido que nuestra serie de mesas LISABO fuera galardonada con el premio de diseño Red Dot en 2016.
        El tablero de chapa de fresno y las patas de abedul macizo producen un toque cálido y acogedor en la habitación
        Diseñada para que combine a la perfección con las sillas LISABO. También queda muy bien con las sillas ÄLVSTA, RÖNNINGE y KARLPETTER de diferentes estilos.
        El fresno es una madera dura, resistente y con vetas decorativas. Con el tiempo el color adopta un tono más cálido y dorado.
        Es fácil de montar, gracias a que cada pata solo tiene un solo empalme.
        Esta mesa ha sido probada bajo nuestras normas más estrictas de estabilidad, durabilidad y seguridad, y resistirá el uso diario durante muchos años.
      `,
      imagesRoute: 'assets/3_mesa_madera/'
    },
    {
      id: 4,
      name: 'Pendant Lamp',
      price: 150,
      quantityAvailable: 5,
      discountPrice: null,
      image: '#',
      category: 'Lamps',
      isNew: false,
      isSale: false,
      colorAvailable: [
        "bg-lime-950",
        "bg-green-950",
        "bg-emerald-950",
      ],
      rating: 3.4,
      quantityReviews: 89,
      productContext: 'La brillante superficie y los detalles de color latón de esta lámpara de piso/lectura están inspirados en las antiguas lámparas industriales esmaltadas. Además, es muy práctica gracias al cabezal orientable.',
      productDescription: 
      `
        Proporciona una luz dirigida, perfecta para leer.
        Como el cabezal de la lámpara es regulable, puedes dirigir la luz fácilmente donde quieras.
      `,
      imagesRoute: 'assets/4_lampara/'
    },
    {
      id: 5,
      name: 'Kitchen Island',
      price: 550,
      quantityAvailable: 5,
      discountPrice: 500,
      image: '#',
      category: 'Kitchen',
      isNew: true,
      isSale: true,
      colorAvailable: [
        "bg-yellow-50",
        "bg-stone-500",
        "bg-neutral-950",
      ],
      rating: 2.3,
      quantityReviews: 1020,
      productContext: 'Es una isla fácil de montar y con un espacio muy amplio que puedes aprovechar al máximo, hasta cabe un microondas. La parte trasera está adaptada para el cable, y el cajón se abre y se cierra con facilidad.',
      productDescription: 
      `
        Produce más espacio de almacenamiento, utilitario y de trabajo.
        Una barra con una gruesa chapa de roble, un material natural y resistente cuya superficie se puede lijar y tratar cuando se necesite.
        Para una rápida instalación y un fácil mantenimiento, la barra está tratada con aceite de cera dura.
        La estructura en capas superpuestas aporta estabilidad y hace que la barra sea menos sensible a la humedad, por lo tanto es menos probable que se agriete, parta o doble, en comparación con la madera maciza.
        Esta barra está diseñada como un tablón completo, por eso tiene un aire a madera natural.
        La isla de cocina tiene un cajón extraíble que se cierra de forma silenciosa y suave.
        El cajón de la isla de cocina se puede extraer totalmente para poder ver y acceder a todo su contenido.
        El mueble está diseñado para colocar un horno microondas en uno de los estantes y su parte trasera está adaptada para permitir el paso del cable y del enchufe.
      `,
      imagesRoute: 'assets/5_isla_comedor/'
    },
    {
      id: 6,
      name: 'Dining Chair',
      price: 180,
      quantityAvailable: 5,
      discountPrice: null,
      image: '#',
      category: 'Chairs',
      isNew: false,
      isSale: false,
      colorAvailable: [
        "bg-neutral-100",
      ],
      rating: 5,
      quantityReviews: 3210,
      productContext: 'Una silla cómoda, resistente, ligera y apilable. Combina fácilmente con mesas y sillas de diferentes estilos, y encaja perfectamente en el comedor, en la entrada o el dormitorio.',
      productDescription: 
      `
        Fácil de guardar cuando no se utiliza: puedes apilar hasta 6 unidades.
      `,
      imagesRoute: 'assets/6_silla_comedor/'
    },
    {
      id: 7,
      name: 'Coffee Table',
      price: 280,
      quantityAvailable: 5,
      discountPrice: 250,
      image: '#',
      category: 'Tables',
      isNew: true,
      isSale: true,
      colorAvailable: [
        "bg-amber-950",
        "bg-stone-800"
      ],
      rating: 0,
      quantityReviews: 100,
      productContext: 'Esta mesa LACK en negro-café es fácil de combinar con otros muebles. La construcción de relleno atamborado añade resistencia a la mesa y, al mismo tiempo, la hace más ligera para poder moverla con facilidad.',
      productDescription: 
      `
        Carga máxima sobre el tablero: 20 kg.
        El producto se puede reciclar o destinar a recuperación energética (si está disponible en tu zona).
        Combina con otros productos de la serie LACK.
      `,
      imagesRoute: 'assets/7_mesa_cafetera/'
    },
    {
      id: 8,
      name: 'Floor Lamp',
      price: 200,
      quantityAvailable: 5,
      discountPrice: null,
      image: '#',
      category: 'Lamps',
      isNew: false,
      isSale: false,
      colorAvailable: [
        "bg-stone-600",
        "bg-stone-700",
        "bg-stone-800"
      ],
      rating: 2,
      quantityReviews: 22,
      productContext: 'En cuanto añadas la bombilla que quieras a esta sencilla lámpara de piso, podrás disfrutar de una agradable luz que podrás orientar donde quieras.',
      productDescription: 
      `
        Puedes orientar la luz donde quieras, ya que el portalámparas se puede girar y mover hacia arriba y abajo en el poste.
        Completa la lámpara con una bombilla decorativa si quieres crear un ambiente aún más acogedor.
      `,
      imagesRoute: 'assets/8_lampara/'
    }
  ]
  
  constructor() { }
  
  getAllProducts(): ProductList[] {
    return this.productsListCompleted;
  }
  
  getProductById(id:number): ProductList | undefined {
    return this.productsListCompleted.find((porductInfo) => porductInfo.id == id);
  }

  getProductRatig(id:number): number {
    this.temp = this.productsListCompleted.find((porductInfo) => porductInfo.id == id);
    return this.temp?.rating ? this.temp.rating : 0
  }
  
  getRelatedProducts(categoryRelated: string | undefined): ProductList[] {
    return this.productsListCompleted.filter((product) => product.category === categoryRelated)
  }
}
