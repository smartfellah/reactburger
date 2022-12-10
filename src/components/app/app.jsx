import React, { useEffect, useState, useReducer } from "react";

//Context
import { ConstructorContext } from "../../context/constructor-context";

//API
import { dataURL } from "../../services/endpoint";
import { checkResponse } from "../../utils/check-response";

//Components
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";

//Styles
import appStyles from "./app.module.css";

function App() {
  const constructorInitialState = {
    bun: {},
    usedIngredients: [],
    totalCost: 0,
    allIngredients: [],
    lastOrderNumber: 0,
  };
  const constructorReducer = (state, action) => {
    switch (action.type) {
      case "initAll":
        return { ...state, allIngredients: action.fullData };
      case "addIngredient":
        return {
          ...state,
          usedIngredients: [...state.usedIngredients, action.newIngredient],
          totalCost: state.totalCost + action.newIngredient.price,
        };
      case "addBun":
        return {
          ...state,
          bun: action.bunData,
          totalCost: state.bun.price
            ? state.totalCost + action.bunData.price * 2 - state.bun.price * 2
            : state.totalCost + action.bunData.price * 2,
        };
      case "makeOrder":
        return {
          ...state,
          lastOrderNumber: action.lastOrderNumber,
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
    //-Data Fetch-----------------------------------------------
    try {
      const response = await fetch(`${dataURL}/ingredients`);

      const dataResponse = await checkResponse(response);

      setIngredientsData(dataResponse.data);

      constructorDispatcher({
        type: "initAll",
        fullData: dataResponse.data.filter((elem) => {
          return elem.type !== "bun";
        }),
      });
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
          <ConstructorContext.Provider
            value={[constructorState, constructorDispatcher]}
          >
            <BurgerIngredients ingredientsData={ingredientsData} />
            <BurgerConstructor />
          </ConstructorContext.Provider>
        </main>
      ) : null}
    </div>
  );
}

export default App;
