//UI
import styles from "./page-styles/profile.module.css";
import {
  PasswordInput,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

//React
import { useState } from "react";

//Router
import { Link } from "react-router-dom";

export const Profile = () => {
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
  return (
    <div className={`${styles["profile-page__wrapper"]}`}>
      <div className={`${styles["profile-page__container"]}`}>
        <div className={`${styles["profile-page__menu-container"]}`}>
          <div className={`${styles["profile-page__menu-nav"]}`}>
            <Link to="/profile">
              <p className="text text_type_main-medium pt-3 pb-3">Профиль</p>
            </Link>
            <Link to="404">
              <p className="text text_type_main-medium text_color_inactive pt-3 pb-3">
                История заказов
              </p>
            </Link>
            <Link to="404">
              <p className="text text_type_main-medium text_color_inactive pt-3 pb-3">
                Выход
              </p>
            </Link>
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
            <EmailInput
              onChange={onNameChange}
              value={nameValue}
              name={"email"}
              placeholder="Имя"
              isIcon={true}
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
