//UI
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientItemStyles from "./ingredients-item.module.css";

//Types
import { TIngredientsItemProps } from "../types";
import { TConstructorData } from "../../burger-constructor/types";

//Redux
import { useDispatch, useSelector } from "../../../services/create-store";
import { SHOW_INGREDIENT_DETAILS } from "../../../services/actions/single-ingredient-actions";

//React
import { FC, SyntheticEvent, useEffect, useState } from "react";

//Router
import { useNavigate } from "react-router-dom";

//DND
import { useDrag } from "react-dnd/dist/hooks";

export const IngredientsItem: FC<TIngredientsItemProps> = ({
  singleIngredientData,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [amount, setAmount] = useState<number>(0);

  const constructorIngredients: TConstructorData = useSelector(
    (store) => store.constructorReducer.data
  );
  const constructorBun = useSelector((store) => store.constructorReducer.bun);

  const [, dragRef] = useDrag({
    type: "ingredient",
    item: {
      ...singleIngredientData,
    },
  });

  useEffect(() => {
    if (singleIngredientData.type === "bun") {
      if (!constructorBun) setAmount(0);
      else {
        constructorBun._id === singleIngredientData._id
          ? setAmount(2)
          : setAmount(0);
      }
    } else
      setAmount(
        constructorIngredients.filter(
          (ingredient) => ingredient._id === singleIngredientData._id
        ).length
      );
  }, [constructorIngredients, constructorBun, singleIngredientData]);

  const handleClick = (e: SyntheticEvent): void => {
    const detailsForModal = {
      image: singleIngredientData.image_large,
      name: singleIngredientData.name,
      calories: singleIngredientData.calories,
      proteins: singleIngredientData.proteins,
      fat: singleIngredientData.fat,
      carbohydrates: singleIngredientData.carbohydrates,
    };
    dispatch({
      type: SHOW_INGREDIENT_DETAILS,
      payload: {
        ...detailsForModal,
      },
    });
    navigate(`/ingredients/${singleIngredientData._id}`, {
      state: { ingredientDetails: { ...detailsForModal } },
    });
  };

  return (
    <div
      className={`${ingredientItemStyles.IngredientContainer}`}
      onClick={handleClick}
      ref={dragRef}
    >
      {amount ? (
        <Counter count={amount} size="default" extraClass="m-1" />
      ) : null}
      <div className={`${ingredientItemStyles.IngredientImg}`}>
        <img src={singleIngredientData.image} alt="ingredient" />
      </div>
      <div className={`${ingredientItemStyles.IngredientPrice}`}>
        <p className="text text_type_digits-default">
          {singleIngredientData.price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${ingredientItemStyles.IngredientName}`}>
        {singleIngredientData.name}
      </div>
    </div>
  );
};
