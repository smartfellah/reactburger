import { useEffect, useState } from "react";
import { TOrderType } from "../services/feed/types";
import { apiRequest, checkSuccess } from "../utils/api-request";
import { dataURL } from "../utils/endpoint";
import { useParams } from "react-router-dom";
import styles from "./page-styles/single-order.module.css";
import { useSelector } from "../services/create-store";
import { TSingleIngredient } from "../components/burger-ingredients/types";
import {
  CurrencyIcon,
  FormattedDate,
} from "@ya.praktikum/react-developer-burger-ui-components";

export type TSingleOrder = {
  owner: string;
  __v: number;
} & TOrderType;
type TSingleOrderResponse = {
  orders: Array<TSingleOrder>;
  success: boolean;
};

export const SingleOrder = () => {
  const [state, setState] = useState<TSingleOrder | null>(null);

  const { number } = useParams();

  useEffect(() => {
    let response;
    (async () => {
      try {
        response = await apiRequest<TSingleOrderResponse>(
          `${dataURL}/orders/${number}`
        );
        checkSuccess(response);
        setState({ ...response.orders[0] });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [number]);

  const ingredientsCatalog = useSelector((store) => {
    return store.ingredientsReducer.data;
  });
  const ingredientsDataList = ingredientsCatalog.filter((ingredient) => {
    return state?.ingredients.includes(ingredient._id);
  });

  const cost = ingredientsDataList.reduce(
    (acc: number, curr: TSingleIngredient, index) => {
      if (!index) return acc + curr.price * 2;
      return acc + curr.price;
    },
    0
  );

  // const location = useLocation();
  return state ? (
    <div className={styles.pageWrapper}>
      <p className="text text_type_main-medium">#{state?.number}</p>

      <div>
        <h1 className="text text_type_main-large mb-3">{state?.name}</h1>
        <p
          className={`${
            state.status === "done" ? styles.status_done : ""
          } text text_type_main-default`}
        >
          {(() => {
            let { status } = state!;
            if (status === "done") return "Выполнен";
            else if (status === "pending") return "Готовится";
            else return "Создан";
          })()}
        </p>
        <h2
          className={`${styles.ingredientsList_header} text text_type_main-large`}
        >
          Состав:
        </h2>
        <div className={styles.ingredientsList}>
          {ingredientsDataList.map((ingredient, index) => {
            const counter = state.ingredients.filter(
              (id) => id === ingredient._id
            ).length;
            return (
              <div className={styles.ingredientContainer} key={index}>
                <div className={styles.imageContainer}>
                  <img
                    className={`${styles.image}`}
                    src={ingredient.image_mobile}
                    alt="ingredient_image"
                  />
                </div>
                <p className="text text_type_main-default">{ingredient.name}</p>
                <div className={styles.cost}>
                  <p className="text text_type_digits-default">
                    {counter} x {ingredient.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.orderFooter}>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(state.createdAt)}
        />
        <div className={styles.cost}>
          <p className="text text_type_digits-default">{cost}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  ) : null;
};
