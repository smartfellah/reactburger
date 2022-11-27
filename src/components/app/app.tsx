import React from "react";
import appStyles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { hardcodeData } from "../../utils/hardcodeData";

function App() {
  return (
    <div className={`${appStyles.App}`}>
      <AppHeader />
      <main className={`${appStyles.ColumnsWrapper}`}>
        <BurgerIngredients hardcodeData={hardcodeData} />
        <BurgerConstructor hardcodeData={hardcodeData} />
      </main>
    </div>
  );
}

export default App;
