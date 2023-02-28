export type TConstructorData = Array<TConstructorIngredient>;

export type TRequestData = Array<string>;

export type TConstructorIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  Uid: string;
};

export type TDroppedItem = {
  position: number;
};

export type TToppingProps = {
  ingredient: TConstructorIngredient;
  position: number;
};
