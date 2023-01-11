import styles from "./page-styles/page404.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";

export const Page404 = ({}) => {
  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.container}`}>
        <h1 className={`text text_type_digits-large`}>404</h1>
        <p className={`text text_type_main-medium text_color_inactive`}>
          Страница не найдена
        </p>
      </div>
    </div>
  );
};
