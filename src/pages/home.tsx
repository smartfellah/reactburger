//Components
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor";

//UI
import styles from "../pages/page-styles/home.module.css";

export const HomePage = () => {
  return (
    <div>
      <main className={`${styles["main-columns-wrapper"]}`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
};
