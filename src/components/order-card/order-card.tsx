import { FC } from "react";
import {
  TIngredientsData,
  TSingleIngredient,
} from "../burger-ingredients/types";

//Redux
import { useSelector } from "../../services/create-store";

import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./order-card.module.css";

type TOrderCardProps = {
  id: number;
  title: string;
  ingredientsList: Array<string>;
  totalPrice: number;
  date: string;
};

export const OrderCard: FC<TOrderCardProps> = ({
  id,
  title,
  ingredientsList,
  totalPrice,
  date,
}) => {
  const ingredientsCatalog = useSelector((store) => {
    return store.ingredientsReducer.data;
  });
  const ingredientsDataList = ingredientsCatalog.filter((ingredient) => {
    return ingredientsList.includes(ingredient._id);
  });
  const cost = ingredientsDataList.reduce(
    (acc: number, curr: TSingleIngredient, index) => {
      if (!index) return acc + curr.price * 2;
      return acc + curr.price;
    },
    0
  );

  return (
    <div className={styles.container}>
      <div className={styles.firstRow}>
        <p className="text text_type_digits-default">#{id}</p>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(date)}
        ></FormattedDate>
      </div>
      <h3 className="text text_type_main-medium">{title}</h3>
      <div className={styles.thirdRow}>
        <div className={styles.imagesList}>
          {ingredientsDataList.map((ingredient, index, array) => {
            let posCounter = array.length;
            if (index <= 5)
              return (
                <div
                  className={styles.imageContainer}
                  style={{ zIndex: posCounter - index }}
                  key={index}
                >
                  <img
                    className={`${
                      index === 5
                        ? `${styles.image} ${styles.image_blurred}`
                        : styles.image
                    }`}
                    src={ingredient.image_mobile}
                    alt="ingredient_image"
                  />
                  {index === 5 ? (
                    <p
                      className={`${styles.counter}text text_type_digits-default`}
                    >
                      +{array.length - index}
                    </p>
                  ) : null}
                </div>
              );
            else return null;
          })}
        </div>
        <div className={styles.totalPrice}>
          <p className="text text_type_digits-default">{cost}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
