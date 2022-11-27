import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { AppHeader } from "./components/app-header/app-header";
import { BurgerIngredients } from "./components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "./components/burger-constructor/burger-constructor";
import { hardcodeData } from "./utils/hardcodeData";

function App() {
  return (
    <div className="App">
      <AppHeader></AppHeader>
      <main className="ColumnsWrapper">
        <BurgerIngredients hardcodeData={hardcodeData}></BurgerIngredients>
        <BurgerConstructor hardcodeData={hardcodeData}></BurgerConstructor>
      </main>
    </div>
  );
}

export default App;
