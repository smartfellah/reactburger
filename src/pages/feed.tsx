//UI
import styles from "./page-styles/feed.module.css";
import { OrderCard } from "../components/order-card/order-card";
import { useSelector } from "react-redux";
import { TRootState } from "../services/create-store";

export const Feed = () => {
  const TESTingredients = useSelector((store: TRootState) =>
    [...store.ingredientsReducer.data].slice(0, 9)
  );

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.leftColumn}>
        <h1 className="text text_type_main-medium">Лента заказов</h1>
        <div className={styles.ordersList_Container}>
          <OrderCard
            id="034535"
            title="SomeBurger"
            ingredientsList={TESTingredients}
            totalPrice={1337}
            date="2022-10-10T17:33:32.877Z"
          ></OrderCard>
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.currentOrders}></div>
        <div className={styles.totalOrders}>
          <div className={styles.ready}></div>
          <div className={styles.inProgress}></div>
        </div>
        <div className={styles.todayTotal}></div>
      </div>
    </div>
  );
};
