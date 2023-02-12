//UI
import styles from "./page-styles/profile.module.css";
import {
  PasswordInput,
  EmailInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

//React
import React, { useEffect } from "react";
import { useState } from "react";

//Router
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  sendGetUserRequest,
  sendLogoutRequest,
  sendPatchUserRequest,
} from "../services/actions/auth-actions";

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [renderButtons, setRenderButtons] = useState(false);
  const [inputIsDisabled, setInputIsDisabled] = useState(true);

  const [nameValue, setNameValue] = useState(
    localStorage.getItem("name") ? localStorage.getItem("name") : "Name"
  );
  const [emailValue, setEmailValue] = useState(
    localStorage.getItem("email")
      ? localStorage.getItem("email")
      : "name@email.com"
  );
  const [passwordValue, setPasswordValue] = useState("");

  const onNameChange = (e) => {
    setNameValue(e.target.value);
    setRenderButtons(true);
  };
  const onEmailChange = (e) => {
    setEmailValue(e.target.value);
    setRenderButtons(true);
  };
  const onPasswordChange = (e) => {
    setPasswordValue(e.target.value);
    setRenderButtons(true);
  };

  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setInputIsDisabled(!inputIsDisabled);
    setTimeout(() => inputRef.current.focus(), 0);
  };
  const onBlur = (e) => {
    setInputIsDisabled(!inputIsDisabled);
    onFormBlur(e);
  };

  function onLogoutClick(e) {
    dispatch(sendLogoutRequest(navigate));
  }

  const userData = useSelector(function profileUserSelector(store) {
    return store.authReducer.user;
  });

  useEffect(function profileRenderEffect() {
    dispatch(sendGetUserRequest(navigate));
  }, []);

  useEffect(
    function profileUpdatedEffect() {
      setEmailValue(userData ? userData.email : emailValue);
      setNameValue(userData ? userData.name : nameValue);
      setPasswordValue(userData ? "" : passwordValue);
      setRenderButtons(false);
    },
    [userData]
  );

  function onSubmitClick(e) {
    dispatch(
      sendPatchUserRequest(
        {
          name: nameValue,
          email: emailValue,
          password: passwordValue,
        },
        navigate
      )
    );
    setRenderButtons(false);
  }

  function onAbortClick(e) {
    setEmailValue(userData.email);
    setNameValue(userData.name);
    setPasswordValue("");
    setRenderButtons(false);
  }

  function onFormBlur(e) {
    if (
      emailValue === userData.email &&
      nameValue === userData.name &&
      passwordValue === ""
    ) {
      setRenderButtons(false);
    } else setRenderButtons(true);
  }

  return (
    <div className={`${styles["profile-page__wrapper"]}`}>
      <div className={`${styles["profile-page__container"]}`}>
        <div className={`${styles["profile-page__menu-container"]}`}>
          <div className={`${styles["profile-page__menu-nav"]}`}>
            <NavLink to="/profile" end>
              {function profileLinkContent({ isActive }) {
                return (
                  <p
                    className={`text text_type_main-medium pt-3 pb-3 ${
                      !isActive && "text_color_inactive"
                    }`}
                  >
                    Профиль
                  </p>
                );
              }}
            </NavLink>
            <NavLink to="/profile/orders">
              {function ordersLinkContent({ isActive }) {
                return (
                  <p
                    className={`text text_type_main-medium pt-3 pb-3 ${
                      !isActive && "text_color_inactive"
                    }`}
                  >
                    История заказов
                  </p>
                );
              }}
            </NavLink>
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
              icon={inputIsDisabled ? "EditIcon" : "CloseIcon"}
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
              onBlur={onFormBlur}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <PasswordInput
              onChange={onPasswordChange}
              value={passwordValue}
              name={"password"}
              icon={"EditIcon"}
              onBlur={onFormBlur}
            />
          </div>
          {renderButtons ? (
            <div className={`${styles["profile-page-form_buttons"]}`}>
              <Button
                onClick={onAbortClick}
                htmlType="reset"
                type="secondary"
                size="medium"
              >
                Отмена
              </Button>
              <Button
                onClick={onSubmitClick}
                htmlType="submit"
                type="primary"
                size="medium"
              >
                Сохранить
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
