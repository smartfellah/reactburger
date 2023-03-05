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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  sendLogoutRequest,
  sendPatchUserRequest,
} from "../services/actions/auth-actions";
import { useForm } from "../hooks/useForm";

export const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { formState, handleFormChange, setFormState } = useForm({
    nameValue: localStorage.getItem("name") || "Name",
    emailValue: localStorage.getItem("email") || "name@email.com",
    passwordValue: "",
  });

  const [renderButtons, setRenderButtons] = useState(false);
  const [inputIsDisabled, setInputIsDisabled] = useState(true);

  function onFormChange(e) {
    handleFormChange(e);
    setRenderButtons(true);
  }

  //Enable input and focus on it when "edit" icon is clicked
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
    dispatch(sendLogoutRequest());
  }

  const userData = useSelector(function profileUserSelector(store) {
    return store.authReducer.user;
  });

  //Update form state with pathced data from backend
  useEffect(
    function profileUpdatedEffect() {
      setFormState({
        emailValue: userData?.email || formState.emailValue,
        nameValue: userData?.name || formState.nameValue,
        passwordValue: userData ? "" : formState.passwordValue,
      });
      setRenderButtons(false);
    },
    [userData]
  );

  function onSubmitClick(e) {
    dispatch(
      sendPatchUserRequest(
        {
          name: formState.nameValue,
          email: formState.emailValue,
          password: formState.passwordValue,
        },
        navigate
      )
    );
    setRenderButtons(false);
  }

  //Restore form state using data from backend
  function onAbortClick(e) {
    setFormState({
      emailValue: userData.email,
      nameValue: userData.name,
      passwordValue: "",
    });
    setRenderButtons(false);
  }

  //Hide "save" and "cancel" buttons on form blur if neither of inputs changed
  function onFormBlur(e) {
    if (
      formState.emailValue === userData.email &&
      formState.nameValue === userData.name &&
      formState.passwordValue === ""
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
            <NavLink to="orders">
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
        {location?.pathname === "/profile" ? (
          <div className={`${styles["profile-page__form"]}`}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Input
                type="text"
                onChange={onFormChange}
                icon={inputIsDisabled ? "EditIcon" : "CloseIcon"}
                disabled={inputIsDisabled}
                onIconClick={onIconClick}
                onBlur={onBlur}
                value={formState.nameValue}
                name={"nameValue"}
                placeholder="Имя"
                ref={inputRef}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <EmailInput
                onChange={onFormChange}
                value={formState.emailValue}
                name={"emailValue"}
                isIcon={true}
                onBlur={onFormBlur}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <PasswordInput
                onChange={onFormChange}
                value={formState.passwordValue}
                name={"passwordValue"}
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
        ) : null}
      </div>
    </div>
  );
};
