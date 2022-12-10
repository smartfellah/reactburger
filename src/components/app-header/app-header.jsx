import headerStyles from "./app-header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const AppHeader = () => {
  return (
    <header className={`${headerStyles.Header}`}>
      <nav className={`${headerStyles.NavBar} `}>
        <menu className={`${headerStyles.MenuBox}`}>
          <a className={`${headerStyles["MenuBox-Item-Active"]}`} href="#">
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
          </a>
          <a className={`${headerStyles["MenuBox-Item"]}`} href="#">
            <ListIcon type="secondary" />
            <p className="text text_type_main-default">Лента заказов</p>
          </a>
        </menu>
        <div className={`${headerStyles.LogoBox}`}>
          <Logo className={`${headerStyles["LogoBox-Item"]}`}></Logo>
        </div>
        <div className={`${headerStyles.ProfileBox}`}>
          <a className={`${headerStyles["ProfileBox-Item"]}`} href="#">
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default">Личный кабинет</p>
          </a>
        </div>
      </nav>
    </header>
  );
};
