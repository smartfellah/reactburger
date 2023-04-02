//UI
import styles from "./page-styles/orders.module.css";

//React
import { useEffect } from "react";

//Redux
import { useSelector, useDispatch } from "../services/create-store";
import { OrderCard } from "../components/order-card/order-card";

//Router
import { Link, useLocation } from "react-router-dom";

//WS
import { TOrderType, WebsocketStatus } from "../services/feed/types";
import {
  connect as feedConnect,
  disconnect as feedDisconnect,
} from "../services/feed/actions";
import { feedURL } from "../utils/endpoint";
import { getCookie } from "../utils/cookie";

export const Orders = () => {
  //WebSocket-----------------------------------------------
  const dispatch = useDispatch();
  const { status } = useSelector((store) => {
    return store.feedReducer;
  });

  const isDisconnected = status !== WebsocketStatus.ONLINE;

  const token = getCookie("accessToken");
  const connect = () => {
    dispatch(feedConnect(`${feedURL}?token=${token}`));
  };
  const disconnect = () => dispatch(feedDisconnect());

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, []);
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
  ) : null;
};
