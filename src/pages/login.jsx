//React
import { useState } from "react";

//Router
import { Link } from "react-router-dom";

//UI
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./page-styles/login.module.css";

export const LogInPage = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };
  return (
    <div className={`${styles.LoginWrapper}`}>
      <div className={`${styles.LoginContainer}`}>
        <div className={`${styles.FormContainer}`}>
          <h2 className={`text text_type_main-medium`}>Вход</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <EmailInput
              onChange={onEmailChange}
              value={emailValue}
              name={"email"}
              isIcon={false}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <PasswordInput
              onChange={onPasswordChange}
              value={passwordValue}
              name={"password"}
            />
          </div>
          <Button htmlType="button" type="primary" size="medium">
            Войти
          </Button>
        </div>
        <div className={`${styles.OptionMenuContainer}`}>
          <div className={`${styles.OptionContainer}`}>
            <p className="text text_type_main-default text_color_inactive pl-10">
              Вы - новый пользователь?
            </p>
            <Link to="/register">
              <Button htmlType="button" type="secondary" size="medium">
                Зарегистрироваться
              </Button>
            </Link>
          </div>
          <div className={`${styles.OptionContainer}`}>
            <p className="text text_type_main-default text_color_inactive pl-10">
              Забыли пароль?
            </p>
            <Button htmlType="button" type="secondary" size="medium">
              Восстановить пароль
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
