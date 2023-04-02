import styles from "./page-styles/orders.module.css";

import { useSelector } from "../services/create-store";
import { OrderCard } from "../components/order-card/order-card";
import { Link } from "react-router-dom";

export const Orders = () => {
  const orders = useSelector((store) => {
    return store.feedReducer.orders;
  });
  return (
    <div className={styles.ordersList}>
      {orders.map((order) => {
        return (
          <Link to={`${order.number}`}>
            <OrderCard
              key={order._id}
              title={order.name}
              id={order.number}
              ingredientsList={order.ingredients}
              date={order.createdAt}
              status={order.status}
            />
          </Link>
        );
      })}
    </div>
  );
};
