//UI
import styles from "./page-styles/orders.module.css";

//React
import { useEffect, useCallback } from "react";

//Redux
import { useSelector, useDispatch } from "../services/create-store";
import { OrderCard } from "../components/order-card/order-card";

//Router
import { Link, useLocation } from "react-router-dom";

//WS
import { TOrderType } from "../services/feed/types";
import {
  connect as feedConnect,
  disconnect as feedDisconnect,
} from "../services/feed/actions";
import { feedURL } from "../utils/endpoint";
import { getCookie } from "../utils/cookie";

export const Orders = () => {
  //WebSocket-----------------------------------------------
  const dispatch = useDispatch();

  const token = getCookie("accessToken");
  const connect = useCallback(() => {
    dispatch(feedConnect(`${feedURL}?token=${token}`));
  }, []);
  const disconnect = useCallback(() => dispatch(feedDisconnect()), [dispatch]);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);
  //-------------------------------------------------------
  const compareFn = (a: TOrderType, b: TOrderType) => {
    const a_date = new Date(a.createdAt).getTime();
    const b_date = new Date(b.createdAt).getTime();
    return b_date - a_date;
  };

  const ordersList = useSelector((store) => {
    return store.feedReducer.orders;
  });
  let orders = ordersList.slice();
  orders = orders.sort(compareFn);
  const location = useLocation();
  return orders ? (
    <div className={styles.ordersList}>
      {orders.map((order) => {
        return (
          <Link
            to={`${order.number}`}
            state={{ backgroundLocation: location }}
            key={order._id}
          >
            <OrderCard
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
  ) : null;
};
