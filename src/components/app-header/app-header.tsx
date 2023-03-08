//UI
import headerStyles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

//React
import { FC } from "react";

import { NavLink } from "react-router-dom";

export const AppHeader: FC = () => {
  return (
    <header className={`${headerStyles.Header}`}>
      <nav className={`${headerStyles.NavBar} `}>
        <menu className={`${headerStyles.MenuBox}`}>
          <NavLink className={`${headerStyles["MenuBox-Item"]}`} to="/">
            {({ isActive }) => {
              return (
                <>
                  <BurgerIcon type={isActive ? "primary" : "secondary"} />
                  <p
                    className={
                      isActive
                        ? "text text_type_main-default"
                        : "text text_type_main-default text_color_inactive"
                    }
                  >
                    Конструктор
                  </p>
                </>
              );
            }}
          </NavLink>
          <NavLink to="404" className={`${headerStyles["MenuBox-Item"]}`}>
            {function ordersLinkContent({ isActive }) {
              return (
                <>
                  <ListIcon type={isActive ? "primary" : "secondary"} />
                  <p
                    className={
                      isActive
                        ? "text text_type_main-default"
                        : "text text_type_main-default text_color_inactive"
                    }
                  >
                    Лента заказов
                  </p>
                </>
              );
            }}
          </NavLink>
        </menu>
        <div className={`${headerStyles.LogoBox}`}>
          <Logo />
        </div>
        <div className={`${headerStyles.ProfileBox}`}>
          <NavLink
            to="/profile"
            className={`${headerStyles["ProfileBox-Item"]}`}
          >
            {function profileLinkContent({ isActive }) {
              return (
                <>
                  <ProfileIcon type={isActive ? "primary" : "secondary"} />
                  <p
                    className={
                      isActive
                        ? "text text_type_main-default"
                        : "text text_type_main-default text_color_inactive"
                    }
                  >
                    Личный кабинет
                  </p>
                </>
              );
            }}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
