import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientItemStyles from "./ingredients-item.module.css";
export const IngredientsItem = ({ data }) => {
  return (
    <div className={`${ingredientItemStyles["IngredientContainer"]}`}>
      <Counter count={1} size="default" extraClass="m-1" />
      <div className={`${ingredientItemStyles["IngredientImg"]}`}>
        <img src={data.image} alt="" />
      </div>
      <div className={`${ingredientItemStyles["IngredientPrice"]}`}>
        <p className="text text_type_digits-default">{data.price}</p>
        <CurrencyIcon></CurrencyIcon>
      </div>
      <div className={`${ingredientItemStyles["IngredientName"]}`}>
        {data.name}
      </div>
    </div>
  );
};
