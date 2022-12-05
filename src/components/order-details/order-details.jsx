import orderDetailsStyles from "./order-details.module.css";
import doneIconPath from "../../images/done.svg";
export const OrderDetails = () => {
  return (
    <article className={`${orderDetailsStyles["OrderDetails"]}`}>
      <p
        className={`${orderDetailsStyles["OrderDetails-OrderId"]} text text_type_digits-large`}
      >
        0345366
      </p>
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
