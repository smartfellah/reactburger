//Router
import { Link } from "react-router-dom";

//UI
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./page-styles/login.module.css";

//Redux
import { useDispatch } from "react-redux";
import { sendLoginRequest } from "../services/actions/auth-actions";
import { Dispatch } from "redux";

//Hooks
import { useForm } from "../hooks/useForm";

export const LoginPage = () => {
  const dispatch = useDispatch<Dispatch<any>>();

  const { formState, handleFormChange } = useForm({
    emailValue: "",
    passwordValue: "",
  });

  function onLoginClick(): void {
    const requestBody = {
      email: formState.emailValue,
      password: formState.passwordValue,
    };
    dispatch(sendLoginRequest(requestBody));
  }

  return (
    <div className={`${styles.LoginWrapper}`}>
      <div className={`${styles.LoginContainer}`}>
        <div className={`${styles.FormContainer}`}>
          <h2 className={`text text_type_main-medium`}>Вход</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <EmailInput
              onChange={handleFormChange}
              value={formState.emailValue}
              name={"emailValue"}
              isIcon={false}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <PasswordInput
              onChange={handleFormChange}
              value={formState.passwordValue}
              name={"passwordValue"}
            />
          </div>
          <Button
            onClick={onLoginClick}
            htmlType="button"
            type="primary"
            size="medium"
          >
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
            <Link to="/forgot-password">
              <Button htmlType="button" type="secondary" size="medium">
                Восстановить пароль
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
