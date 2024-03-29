//UI
import styles from "./page-styles/reset-password.module.css";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

//React
import { FormEvent, SyntheticEvent } from "react";

//Router
import { Link, Navigate, useNavigate, useLocation } from "react-router-dom";

//Redux
import { useDispatch } from "../services/create-store";
import { sendResetPasswordRequest } from "../services/actions/auth-actions";

//Hooks
import { useForm } from "../hooks/useForm";

export const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { formState, handleFormChange } = useForm({
    passwordValue: "",
    codeValue: "",
  });

  function onFormSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch(
      sendResetPasswordRequest(
        formState.codeValue,
        formState.passwordValue,
        navigate
      )
    );
  }

  return location?.state?.fromForgot ? (
    <div className={`${styles["reset-password__wrapper"]}`}>
      <div className={`${styles["reset-password__container"]}`}>
        <form
          onSubmit={onFormSubmit}
          className={`${styles["form__container"]}`}
        >
          <h2 className={`text text_type_main-medium`}>
            Восстановление пароля
          </h2>
          <PasswordInput
            onChange={handleFormChange}
            value={formState.passwordValue}
            name={"passwordValue"}
            placeholder={"Введите новый пароль"}
          />
          <Input
            onChange={handleFormChange}
            value={formState.codeValue}
            name={"codeValue"}
            placeholder={"Введите код из письма"}
          />
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </form>
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
  ) : (
    <Navigate to="/forgot-password" replace />
  );
};
