import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useEffect } from "react";
import { IngredientsArea } from "./ingredients-area/ingredients-area";
import ingredientsStyles from "./burger-ingredients.module.css";
import { ingredientType } from "../../utils/types";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import PropTypes from "prop-types";
export const BurgerIngredients = ({ ingredientsData }) => {
  const [details, setDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const toggleShowDetails = (passedDetails) => {
    setShowDetails(!showDetails);
    setDetails(passedDetails);
  };
  const [current, setCurrent] = useState("bun");
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const toppingsRef = useRef(null);
  const scrollRef = useRef(null);
  const handleTabClick = (e) => {
    setCurrent(e);
    if (e === "bun") {
      scrollRef.current.scroll({
        top: 0,
        behavior: "smooth",
      });
    } else if (e === "sauce") {
      scrollRef.current.scroll({
        top: bunsRef.current.offsetHeight,
        behavior: "smooth",
      });
    } else {
      scrollRef.current.scroll({
        top: bunsRef.current.offsetHeight + saucesRef.current.offsetHeight,
        behavior: "smooth",
      });
    }
  };
  const ingredientScrollHandler = (e) => {
    const scrollPos = scrollRef.current.scrollTop;
    const bunHeight = bunsRef.current.offsetHeight;
    const sauceHeight = saucesRef.current.offsetHeight;
    if (scrollPos < bunHeight) setCurrent("bun");
    else if (scrollPos < sauceHeight + bunHeight) setCurrent("sauce");
    else setCurrent("topping");
  };
  useEffect(() => {
    const scrolledNode = scrollRef.current;
    scrollRef.current.addEventListener("scroll", ingredientScrollHandler);
    return () => {
      scrolledNode.removeEventListener("scroll", ingredientScrollHandler);
    };
  }, []);
  return (
    <>
      <article
        className={`text text_type_main-default ${ingredientsStyles.IngredientsColumn}`}
      >
        <header
          className={`text text_type_main-large ${ingredientsStyles["IngredientsColumn-Header"]}`}
        >
          <h1>Соберите бургер</h1>
        </header>
        <section className={`${ingredientsStyles["IngredientsColumn-Tab"]}`}>
          <Tab value="bun" active={current === "bun"} onClick={handleTabClick}>
            Булки
          </Tab>
          <Tab
            value="sauce"
            active={current === "sauce"}
            onClick={handleTabClick}
          >
            Соусы
          </Tab>
          <Tab
            value="topping"
            active={current === "topping"}
            onClick={handleTabClick}
          >
            Начинки
          </Tab>
        </section>
        <div
          ref={scrollRef}
          className={`${ingredientsStyles["IngredientsColumn-Body"]}`}
        >
          <IngredientsArea
            areaRef={bunsRef}
            type="bun"
            ingredientsData={ingredientsData}
            toggleShowDetails={toggleShowDetails}
          />
          <IngredientsArea
            areaRef={saucesRef}
            type="sauce"
            ingredientsData={ingredientsData}
            toggleShowDetails={toggleShowDetails}
          />
          <IngredientsArea
            areaRef={toppingsRef}
            type="main"
            ingredientsData={ingredientsData}
            toggleShowDetails={toggleShowDetails}
          />
        </div>
      </article>
      {showDetails ? (
        <>
          <Modal
            modalTitle={"Детали ингредиента"}
            closePopup={toggleShowDetails}
          >
            <IngredientDetails details={details}></IngredientDetails>
          </Modal>
        </>
      ) : null}
    </>
  );
};
BurgerIngredients.propTypes = {
  ingredientsData: PropTypes.arrayOf(ingredientType).isRequired,
};
