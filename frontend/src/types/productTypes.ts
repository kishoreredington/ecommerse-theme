export type ProductVariant = {
  size: string;
  available: boolean;
};

export type Product = {
  id: string;
  image: string; // or StaticImageData if you're using Next.js Image
  brand: string;
  name: string;
  category: string;
  type: string;
  price: number;
  currency: string;
  isWishlisted: boolean;
  variants: ProductVariant[];
  productUrl: string;
};
