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
import { Dispatch } from "redux";
import { sendRegisterRequest } from "../services/actions/auth-actions";

//Router
import { Link } from "react-router-dom";

//Hooks
import { useForm } from "../hooks/useForm";

export const RegisterPage = () => {
  const { formState, handleFormChange } = useForm({
    nameValue: "",
    emailValue: "",
    passwordValue: "",
  });

  const dispatch = useDispatch<Dispatch<any>>();

  function onRegisterClickHandler(): void {
    const requestData = {
      email: formState.emailValue,
      password: formState.passwordValue,
      name: formState.nameValue,
    };
    dispatch(sendRegisterRequest(requestData));
  }

  return (
    <div className={`${styles["register-wrapper"]}`}>
      <div className={`${styles["register-container"]}`}>
        <div className={`${styles["form__container"]}`}>
          <h2 className={`text text_type_main-medium`}>Регистраця</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Input
              onChange={handleFormChange}
              value={formState.nameValue}
              name={"nameValue"}
              placeholder="Имя"
            />
          </div>
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
