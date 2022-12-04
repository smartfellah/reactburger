import React, { useEffect, useState } from "react";
import appStyles from "./app.module.css";
import { AppHeader } from "../app-header/app-header";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { Modal } from "../modal/modal";

function App() {
  const dataURL = "https://norma.nomoreparties.space/api";
  const [ingredientsData, setIngredientsData] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);
  const [dataHasError, setDataHasError] = useState(false);
  const [details, setDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const toggleShowDetails = (passedDetails) => {
    setShowDetails(!showDetails);
    setDetails(passedDetails);
  };
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
          <BurgerIngredients
            ingredientsData={ingredientsData}
            toggleShowDetails={toggleShowDetails}
          />
          <BurgerConstructor ingredientsData={ingredientsData} />
        </main>
      ) : null}
      {showDetails ? (
        <>
          <ModalOverlay />
          <Modal
            modalTitle={"Детали ингредиента"}
            toggleShowDetails={toggleShowDetails}
          >
            <IngredientDetails details={details}></IngredientDetails>
          </Modal>
        </>
      ) : null}
    </div>
  );
}

export default App;
