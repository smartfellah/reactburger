import { RefObject } from "react";

export type TIngredientsItemProps = {
  singleIngredientData: TSingleIngredient;
};

export type TIngredientsData = Array<TSingleIngredient>;

export type TIngredientsAreaProps = {
  areaRef: RefObject<HTMLElement>;
  type: string;
};

export type TSingleIngredient = {
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
};
