import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./burger-ingredients.module.css";
export const BurgerIngredients = () => {
  return (
    <div className={`${ingredientsStyles["IngredientsColumn"]}`}>
      <div className={`${ingredientsStyles["IngredientsColumn-Header"]}`}></div>
      <div className={`${ingredientsStyles["IngredientsColumn-Tab"]}`}></div>
      <div className={`${ingredientsStyles["IngredientsColumn-Body"]}`}>
        <div className={`${ingredientsStyles["BunArea"]}`}></div>
        <div className={`${ingredientsStyles["SauceArea"]}`}></div>
        <div className={`${ingredientsStyles["ToppingArea"]}`}></div>
      </div>
    </div>
  );
};
