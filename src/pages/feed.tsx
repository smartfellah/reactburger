//UI
import styles from "./page-styles/feed.module.css";
import { OrderCard } from "../components/order-card/order-card";
import { TRootState } from "../services/create-store";

//Redux
import { useSelector } from "../services/create-store";

export const Feed = () => {
  const orders = useSelector((store) => store.feedReducer.orders);
  debugger;

  return (
    <div className={styles.pageWrapper}>
      <h1 className={`${styles.header} text text_type_main-large`}>
        Лента заказов
      </h1>
      <div className={styles.columnsWrapper}>
        <div className={styles.leftColumn}>
          <div className={styles.ordersList_container}>
            {orders.map((order) => {
              return (
                <OrderCard
                  key={order._id}
                  id={order.number}
                  title={"SomeBurger"}
                  ingredientsList={order.ingredients}
                  date={order.createdAt}
                  totalPrice={1337}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.currentOrders}>
            <div className={styles.ready}>
              <h3 className="text text_type_main-medium">Готовы:</h3>
              <div className={styles.numberContainer}>
                <p className="text text_type_digits-default">123</p>
                <p className="text text_type_digits-default">123</p>
                <p className="text text_type_digits-default">123</p>
                <p className="text text_type_digits-default">123</p>
                <p className="text text_type_digits-default">123</p>
              </div>
            </div>
            <div className={styles.inProgress}>
              <h3 className="text text_type_main-medium">В работе:</h3>
              <div className={styles.numberContainer}>
                <p className="text text_type_digits-default">123</p>
                <p className="text text_type_digits-default">123</p>
                <p className="text text_type_digits-default">123</p>
                <p className="text text_type_digits-default">123</p>
                <p className="text text_type_digits-default">123</p>
              </div>
            </div>
          </div>
          <div className={styles.totalOrders}>
            <h3 className="text text_type_main-medium">
              Выполнено за все время:
            </h3>
            <p className="text text_type_digits-large">228</p>
          </div>
          <div className={styles.todayTotal}>
            <h3 className="text text_type_main-medium">
              Выполнено за сегодня:
            </h3>
            <p className="text text_type_digits-large">228</p>
          </div>
        </div>
      </div>
    </div>
  );
};
