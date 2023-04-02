//UI
import doneIconPath from "../../images/done.svg";
import orderDetailsStyles from "./order-details.module.css";

//Redux
import { useSelector } from "../../services/create-store";

//Types
import { OrderNumber } from "./types";

export const OrderDetails = () => {
  const orderNumber = useSelector((store) => store.orderReducer.data!.result);
  return (
    <article className={`${orderDetailsStyles.OrderDetails}`}>
      {orderNumber ? (
        <p
          className={`${orderDetailsStyles["OrderDetails-OrderId"]} text text_type_digits-large`}
        >
          {orderNumber}
        </p>
      ) : (
        <p
          className={`${orderDetailsStyles["OrderDetails-OrderId"]} text text_type_main-large`}
        >
          Обработка...
        </p>
      )}
      <p
        className={`${orderDetailsStyles["OrderDetails-IDLabel"]} text text_type_main-medium`}
      >
        идентификатор заказа
      </p>
      <div className={`${orderDetailsStyles["OrderDetails-Picture"]}`}>
        <img src={doneIconPath} alt="done" />
      </div>
      <section className={`${orderDetailsStyles["OrderDetails-WaitInfo"]}`}>
        <p className="text text_type_main-default">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive">
          Дождитесь готовности на орбитальной станции
        </p>
      </section>
    </article>
  );
};
