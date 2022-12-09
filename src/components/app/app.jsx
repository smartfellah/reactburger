import React, { useEffect, useState, useReducer } from "react";

//Context
import { ConstructorContext } from "../../context/constructor-context";

//Components
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

//Styles
import appStyles from "./app.module.css";

function App() {
  const dataURL = "https://norma.nomoreparties.space/api";

  const constructorInitialState = {
    bunType: "",
    usedIngredients: [],
    allIngredients: [],
  };
  const constructorReducer = (state, action) => {
    switch (action.type) {
      case "initAll":
        return { ...state, allIngredients: action.fullData };
      case "addIngredient":
        return {
          ...state,
          usedIngredients: [...state.usedIngredients, action.newIngredient],
        };
      default:
        throw new Error("Wrong type of atcion/action is empty");
    }
  };
  const [constructorState, constructorDispatcher] = useReducer(
    constructorReducer,
    constructorInitialState
  );

  const [ingredientsData, setIngredientsData] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [dataHasError, setDataHasError] = useState(false);

  const getData = async () => {
    try {
      const response = await fetch(`${dataURL}/ingredients`);
      if (!response.ok) throw new Error(response.status);
      const dataResponse = await response.json();
      setIngredientsData(dataResponse.data);
      constructorDispatcher({ type: "initAll", fullData: dataResponse.data });
    } catch (error) {
      setDataHasError(true);
      alert("Ошибка при загрузке данных: " + error);
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
          <ConstructorContext.Provider
            value={[constructorState, constructorDispatcher]}
          >
            <BurgerConstructor />
          </ConstructorContext.Provider>
        </main>
      ) : null}
    </div>
  );
}

export default App;
