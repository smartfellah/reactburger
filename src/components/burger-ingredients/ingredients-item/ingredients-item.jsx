import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientItemStyles from "./ingredients-item.module.css";
import { ingredientType } from "../../../utils/types";
import { func } from "prop-types";
export const IngredientsItem = ({
  singleIngredientData,
  toggleShowDetails,
}) => {
  const handleClick = (e) => {
    toggleShowDetails({
      image: singleIngredientData.image_large,
      name: singleIngredientData.name,
      calories: singleIngredientData.calories,
      proteins: singleIngredientData.proteins,
      fat: singleIngredientData.fat,
      carbohydrates: singleIngredientData.carbohydrates,
    });
  };
  return (
    <div
      className={`${ingredientItemStyles["IngredientContainer"]}`}
      onClick={handleClick}
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
IngredientsItem.propTypes = {
  singleIngredientData: ingredientType.isRequired,
  toggleShowDetails: func.isRequired,
};
