//UI
import styles from "./page-styles/reset-password.module.css";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

//React
import { useState } from "react";

//Router
import { Link } from "react-router-dom";

export const ResetPassword = () => {
  const [passwordValue, setPasswordValue] = useState("");
  const [codeValue, setCodeValue] = useState("");

  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const onCodeChange = (e) => {
    setCodeValue(e.target.value);
  };

  return (
    <div className={`${styles["reset-password__wrapper"]}`}>
      <div className={`${styles["reset-password__container"]}`}>
        <div className={`${styles["form__container"]}`}>
          <h2 className={`text text_type_main-medium`}>
            Восстановление пароля
          </h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <PasswordInput
              onChange={onPasswordChange}
              value={passwordValue}
              name={"password"}
              placeholder={"Введите новый пароль"}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Input
              onChange={onCodeChange}
              value={codeValue}
              name={"code"}
              placeholder={"Введите код из письма"}
            />
          </div>
          <Link to="/reset-password">
            <Button htmlType="button" type="primary" size="medium">
              Сохранить
            </Button>
          </Link>
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
