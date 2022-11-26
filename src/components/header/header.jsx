import headerStyles from "./header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const Header = () => {
  return (
    <div className={` text text_type_main-default ${headerStyles["Header"]}`}>
      <div className={`${headerStyles["NavBar"]}`}>
        <div className={`${headerStyles["MenuBox"]}`}>
          <a className={`${headerStyles["MenuBox-Item-Active"]}`} href="#">
            <BurgerIcon type="primary" />
            <p>Конструктор</p>
          </a>
          <a className={`${headerStyles["MenuBox-Item"]}`} href="#">
            <ListIcon type="secondary" />
            <p>Лента заказов</p>
          </a>
        </div>
        <div className={`${headerStyles["LogoBox"]}`}>
          <Logo className={`${headerStyles["LogoBox-Item"]}`}></Logo>
        </div>
        <div className={`${headerStyles["ProfileBox"]}`}>
          <a className={`${headerStyles["ProfileBox-Item"]}`} href="#">
            <ProfileIcon type="secondary" />
            <p>Личный кабинет</p>
          </a>
        </div>
      </div>
    </div>
  );
};
