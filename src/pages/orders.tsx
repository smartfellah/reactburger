import styles from "./page-styles/orders.module.css";

import { useSelector } from "../services/create-store";
import { OrderCard } from "../components/order-card/order-card";
import { Link, useLocation } from "react-router-dom";

export const Orders = () => {
  const orders = useSelector((store) => {
    return store.feedReducer.orders;
  });
  const location = useLocation();
  return (
    <div className={styles.ordersList}>
      {orders.map((order) => {
        return (
          <Link to={`${order.number}`} state={{ backgroundLocation: location }}>
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
