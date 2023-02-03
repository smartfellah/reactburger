//UI
import styles from "./page-styles/register.module.css";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

//Redux
import { useDispatch, useSelector } from "react-redux";
import * as registerActions from "../services/actions/register-actions";

//React
import { useState } from "react";

//Router
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const dispatch = useDispatch();

  const nameValue = useSelector(function registerNameSelector(store) {
    return store.registerReducer.name;
  });
  const emailValue = useSelector(function registerEmailSelector(store) {
    return store.registerReducer.email;
  });
  const passwordValue = useSelector(function registerPasswordSelector(store) {
    return store.registerReducer.password;
  });
  const requestData = useSelector(function registerFormSelector(store) {
    return {
      email: store.registerReducer.email,
      password: store.registerReducer.password,
      name: store.registerReducer.name,
    };
  });

  const onNameChange = (e) => {
    dispatch({
      type: registerActions.NAME_CHANGE,
      payload: e.target.value,
    });
  };
  const onEmailChange = (e) => {
    dispatch({
      type: registerActions.EMAIL_CHANGE,
      payload: e.target.value,
    });
  };
  const onPasswordChange = (e) => {
    dispatch({
      type: registerActions.PASSWORD_CHANGE,
      payload: e.target.value,
    });
  };

  function onRegisterClickHandler(e) {
    dispatch(registerActions.sendRegisterRequest(requestData));
  }
  return (
    <div className={`${styles["register-wrapper"]}`}>
      <div className={`${styles["register-container"]}`}>
        <div className={`${styles["form__container"]}`}>
          <h2 className={`text text_type_main-medium`}>Регистраця</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <EmailInput
              onChange={onNameChange}
              value={nameValue}
              name={"email"}
              placeholder="Имя"
              isIcon={false}
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
