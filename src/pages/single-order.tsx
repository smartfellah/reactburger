import { useEffect, useState } from "react";
import { TOrderType } from "../services/feed/types";
import { apiRequest, checkSuccess } from "../utils/api-request";
import { TWSResponse } from "../services/feed/socket-middleware";
import { dataURL } from "../utils/endpoint";
import { useLocation, useParams } from "react-router-dom";
import styles from "./page-styles/single-order.module.css";
import { useSelector } from "../services/create-store";
import { TSingleIngredient } from "../components/burger-ingredients/types";

type TSingleOrder = {
  owner: string;
  __v: number;
} & TOrderType;

type TSingleOrderResponse = {
  orders: Array<TSingleOrder>;
  success: boolean;
};

export const SingleOrder = () => {
  const [state, setState] = useState<TSingleOrder | null>(null);

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
  }, []);

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
  const { number } = useParams();
  return state ? (
    <div>
      <p className="text text_type_main-medium">#{state?.number}</p>
      <h1 className="text text_type_main-large">{state?.name}</h1>
      <p className="text text_type_main-default">
        {(() => {
          let { status } = state!;
          if (status === "done") return "Выполнен";
          else if (status === "pending") return "Готовится";
          else return "Создан";
        })()}
      </p>
      <h2 className="text text_type_main-large">Состав:</h2>
      <div>
        {ingredientsDataList.map((ingredient, index) => {
          return (
            <div key={index}>
              <img
                className={`${styles.image}`}
                src={ingredient.image_mobile}
                alt="ingredient_image"
              />
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};
