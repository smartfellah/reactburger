//UI
import styles from "./page-styles/profile.module.css";
import {
  PasswordInput,
  EmailInput,
  Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

//React
import React, { useEffect } from "react";
import { useState } from "react";

//Router
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  sendGetUserRequest,
  sendLogoutRequest,
} from "../services/actions/auth-actions";

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputIsDisabled, setInputIsDisabled] = useState(true);

  const [nameValue, setNameValue] = useState("Name");
  const [emailValue, setEmailValue] = useState("name@email.com");
  const [passwordValue, setPasswordValue] = useState("12345678");

  const onNameChange = (e) => {
    setNameValue(e.target.value);
  };
  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setInputIsDisabled(!inputIsDisabled);
    setTimeout(() => inputRef.current.focus(), 0);
  };
  const onBlur = () => {
    setInputIsDisabled(!inputIsDisabled);
  };

  function onLogoutClick(e) {
    dispatch(sendLogoutRequest(navigate));
  }

  const userData = useSelector(function profileUserSelector(store) {
    return store.authReducer.user;
  });

  useEffect(function profileRenderEffect() {
    dispatch(sendGetUserRequest());
  }, []);

  return (
    <div className={`${styles["profile-page__wrapper"]}`}>
      <div className={`${styles["profile-page__container"]}`}>
        <div className={`${styles["profile-page__menu-container"]}`}>
          <div className={`${styles["profile-page__menu-nav"]}`}>
            <Link to="/profile">
              <p className="text text_type_main-medium pt-3 pb-3">Профиль</p>
            </Link>
            <Link to="orders">
              <p className="text text_type_main-medium text_color_inactive pt-3 pb-3">
                История заказов
              </p>
            </Link>
            <button onClick={onLogoutClick}>
              <p className="text text_type_main-medium text_color_inactive pt-3 pb-3">
                Выход
              </p>
            </button>
          </div>
          <div className={`${styles["profile__menu-description"]}`}>
            <p
              className="text text_type_main-small text_color_inactive"
              style={{ opacity: "0.4" }}
            >
              В этом разделе вы можете <br /> изменить свои персональные данные
            </p>
          </div>
        </div>
        <div className={`${styles["profile-page__form"]}`}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Input
              type="text"
              onChange={onNameChange}
              icon={inputIsDisabled ? "EditIcon" : ""}
              disabled={inputIsDisabled}
              onIconClick={onIconClick}
              onBlur={onBlur}
              value={nameValue}
              name={"name"}
              placeholder="Имя"
              ref={inputRef}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <EmailInput
              onChange={onEmailChange}
              value={emailValue}
              name={"email"}
              isIcon={true}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <PasswordInput
              onChange={onPasswordChange}
              value={passwordValue}
              name={"password"}
              icon={"EditIcon"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
