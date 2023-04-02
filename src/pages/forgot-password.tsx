//UI
import styles from "./page-styles/forgot-password.module.css";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

//Router
import { Link, useNavigate } from "react-router-dom";

//Redux
import { useDispatch } from "../services/create-store";

//Actions
import { sendForgotPasswordRequest } from "../services/actions/auth-actions";

//Hooks
import { useForm } from "../hooks/useForm";

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { formState, handleFormChange } = useForm({ emailValue: "" });

  const onRestoreClick = (): void => {
    dispatch(sendForgotPasswordRequest(formState.emailValue, navigate));
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
              onChange={handleFormChange}
              value={formState.emailValue}
              name={"emailValue"}
              placeholder={"Укажите e-mail"}
              isIcon={false}
            />
          </div>
          <Button
            onClick={onRestoreClick}
            htmlType="button"
            type="primary"
            size="medium"
          >
            Восстановить
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
