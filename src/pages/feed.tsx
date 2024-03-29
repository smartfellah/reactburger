//UI
import styles from "./page-styles/feed.module.css";
import { OrderCard } from "../components/order-card/order-card";

//React
import { useEffect, useCallback } from "react";

//Redux
import { useDispatch, useSelector } from "../services/create-store";
import { Link, useLocation } from "react-router-dom";

//WS
import {
  connect as feedConnect,
  disconnect as feedDisconnect,
} from "../services/feed/actions";
import { feedURL } from "../utils/endpoint";

export const Feed = () => {
  //WebSocket-----------------------------------------------
  const dispatch = useDispatch();

  const connect = useCallback(() => {
    dispatch(feedConnect(`${feedURL}/all`));
  }, [dispatch]);
  const disconnect = useCallback(() => dispatch(feedDisconnect()), [dispatch]);

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);
  //-------------------------------------------------------

  const location = useLocation();

  const orders = useSelector((store) => store.feedReducer.orders);
  const total = useSelector((store) => store.feedReducer.total);
  const totalToday = useSelector((store) => store.feedReducer.totalToday);

  let readyOrders;
  let processedOrders;
  if (orders) {
    readyOrders = orders.filter((order) => {
      return order.status === "done";
    });
    processedOrders = orders.filter((order) => {
      return order.status !== "done";
    });
  }
  return orders ? (
    <div className={styles.pageWrapper}>
      <h1 className={`${styles.header} text text_type_main-large`}>
        Лента заказов
      </h1>
      <div className={styles.columnsWrapper}>
        <div className={styles.leftColumn}>
          <div className={styles.ordersList_container}>
            {orders.map((order) => {
              return (
                <Link
                  to={`${order.number}`}
                  state={{ backgroundLocation: location }}
                  key={order._id}
                >
                  <OrderCard
                    id={order.number}
                    title={order.name}
                    ingredientsList={order.ingredients}
                    date={order.createdAt}
                    status={order.status}
                  />
                </Link>
              );
            })}
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.currentOrders}>
            <div className={styles.ready}>
              <h3 className="text text_type_main-medium">Готовы:</h3>
              <div className={styles.numberContainer}>
                {readyOrders?.map((order, index, ordres) => {
                  return (
                    <p key={index} className="text text_type_digits-default">
                      {order.number}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className={styles.inProgress}>
              <h3 className="text text_type_main-medium">В работе:</h3>
              <div className={styles.numberContainer}>
                {processedOrders?.map((order, index, ordres) => {
                  return (
                    <p key={index} className="text text_type_digits-default">
                      {order.number}
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.totalOrders}>
            <h3 className="text text_type_main-medium">
              Выполнено за все время:
            </h3>
            <p className="text text_type_digits-large">{total}</p>
          </div>
          <div className={styles.todayTotal}>
            <h3 className="text text_type_main-medium">
              Выполнено за сегодня:
            </h3>
            <p className="text text_type_digits-large">{totalToday}</p>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
