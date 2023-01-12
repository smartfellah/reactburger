//UI
import styles from "./page-styles/forgot-password.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

//React
import { useState } from "react";

//Router
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
  const [emailValue, setEmailValue] = useState();

  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };
  return (
    <div className={`${styles["forgot-password__wrapper"]}`}>
      <div className={`${styles["forgot-password__container"]}`}>
        <div className={`${styles["form__container"]}`}>
          <h2 className={`text text_type_main-medium`}>
            Восстановление пароля
          </h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <EmailInput
              onChange={onEmailChange}
              value={emailValue}
              name={"email"}
              placeholder={"Укажите e-mail"}
              isIcon={false}
            />
          </div>
          <Button htmlType="button" type="primary" size="medium">
            Восствновить
          </Button>
        </div>
        <div className={`${styles["options-menu__container"]}`}>
          <div className={`${styles["option__container"]}`}>
            <p className="text text_type_main-default text_color_inactive pl-10">
              Вспомнили пароль?
            </p>
            <Link to="/login">
              <Button htmlType="button" type="secondary" size="medium">
                Войти
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
