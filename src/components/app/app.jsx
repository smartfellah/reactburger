import React, { useEffect, useState } from "react";
import appStyles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

function App() {
  const dataURL = "https://norma.nomoreparties.space/api";
  const [ingredientsData, setIngredientsData] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [dataHasError, setDataHasError] = useState(false);
  const getData = async () => {
    try {
      const response = await fetch(`${dataURL}/ingredients`);
      const dataResponse = await response.json();
      setIngredientsData(dataResponse.data);
    } catch {
      setDataHasError(true);
      alert("Ошибка при загрузке данных");
    } finally {
      setDataIsLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className={`${appStyles.App}`}>
      <AppHeader />
      {!dataHasError && !dataIsLoading ? (
        <main className={`${appStyles.ColumnsWrapper}`}>
          <BurgerIngredients ingredientsData={ingredientsData} />
          <BurgerConstructor ingredientsData={ingredientsData} />
        </main>
      ) : null}
    </div>
  );
}

export default App;