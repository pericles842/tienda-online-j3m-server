export interface ProductAttributes<T, C = any> {
  id?: number;
  name: string;
  key: T;
  description: string;
  created_at: string;
  data?: DataProductAttributes;
  value?: UnitsOfProduct | TallaProduct | StyleClothesProduct | PharmaceuticalPresentationProduct;
  attributes: ProductAttributes<C>[];
}

export type ProductTemplateKeys = 'food' | 'technology' | 'textile' | 'farmacia' | 'other';
export type UnitsOfProduct = 'un' | 'mg' | 'oz' | 'lb' | 'kg' | 'lt' | 'ml' | 'g';
export type TallaProduct = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';
export type StyleClothesProduct = 'casual' | 'formal' | 'sport';
export type PharmaceuticalPresentationProduct =
  | 'tablets'
  | 'capsules'
  | 'syrup'
  | 'jarabe'
  | 'crema'
  | 'polvo'
  | 'gel'
  | 'pomada'
  | 'pasta'
  | 'liquido'
  | 'injectable';

export type DataProductAttributes = {
  key: UnitsOfProduct | TallaProduct | StyleClothesProduct | PharmaceuticalPresentationProduct;
  value: string;
}[];

export type productKeyGeneralAttributes =
  | 'color'
  | 'model'
  | 'storage'
  | 'talla'
  | 'gender'
  | 'style_clothes'
  | 'marca'
  | 'unit'
  | 'amount'
  | 'expiration_date'
  | 'manufacturer'
  | 'pharmaceutical_presentation';
