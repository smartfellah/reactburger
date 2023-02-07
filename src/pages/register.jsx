//UI
import styles from "./page-styles/register.module.css";
import {
  EmailInput,
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

//Redux
import { useDispatch } from "react-redux";
import * as authActions from "../services/actions/auth-actions";

//React
import { useState } from "react";

//Router
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getCookie } from "../utils/cookie";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [nameValue, setNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const dispatch = useDispatch();

  const isAuth = getCookie("accessToken") ? true : false;

  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  const requestData = {
    email: emailValue,
    password: passwordValue,
    name: nameValue,
  };

  const onNameChange = (e) => {
    setNameValue(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  function onRegisterClickHandler(e) {
    dispatch(authActions.sendRegisterRequest(requestData, navigate));
  }

  return (
    <div className={`${styles["register-wrapper"]}`}>
      <div className={`${styles["register-container"]}`}>
        <div className={`${styles["form__container"]}`}>
          <h2 className={`text text_type_main-medium`}>Регистраця</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Input
              onChange={onNameChange}
              value={nameValue}
              name={"name"}
              placeholder="Имя"
            />
          </div>
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
          <Button
            onClick={onRegisterClickHandler}
            htmlType="button"
            type="primary"
            size="medium"
          >
            Зарегистрироваться
          </Button>
        </div>
        <div className={`${styles["options-menu__container"]}`}>
          <div className={`${styles["option__container"]}`}>
            <p className="text text_type_main-default text_color_inactive pl-10">
              Уже зарегистрированы?
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
