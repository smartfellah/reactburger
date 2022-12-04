import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientItemStyles from "./ingredients-item.module.css";
import { ingredientType } from "../../../utils/types";
export const IngredientsItem = ({
  singleIngredientData,
  toggleShowDetails,
}) => {
  return (
    <div
      className={`${ingredientItemStyles["IngredientContainer"]}`}
      onClick={toggleShowDetails}
    >
      <Counter count={1} size="default" extraClass="m-1" />
      <div className={`${ingredientItemStyles["IngredientImg"]}`}>
        <img src={singleIngredientData.image} alt="ingredient" />
      </div>
      <div className={`${ingredientItemStyles["IngredientPrice"]}`}>
        <p className="text text_type_digits-default">
          {singleIngredientData.price}
        </p>
        <CurrencyIcon></CurrencyIcon>
      </div>
      <div className={`${ingredientItemStyles["IngredientName"]}`}>
        {singleIngredientData.name}
      </div>
    </div>
  );
};
IngredientsItem.propTypes = ingredientType;
