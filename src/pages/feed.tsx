//UI
import styles from "./page-styles/feed.module.css";

export const Feed = () => {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.leftColumn}>
        <h1 className="text text_type_main-medium">Лента заказов</h1>
        <div className={styles.ordersList_Container}></div>
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
