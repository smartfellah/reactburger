import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useRef, useEffect } from "react";
import { IngredientsItem } from "./ingredients-item/ingredients-item";
import ingredientsStyles from "./burger-ingredients.module.css";
import { ingredientsDataType } from "../../utils/types";
export const BurgerIngredients = ({ hardcodeData }) => {
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
        top: bunsRef.current.offsetHeight + 40,
        behavior: "smooth",
      });
    } else {
      scrollRef.current.scroll({
        top:
          bunsRef.current.offsetHeight +
          saucesRef.current.offsetHeight +
          40 * 2,
        behavior: "smooth",
      });
    }
  };
  const ingredientScrollHandler = (e) => {
    const scrollPos = scrollRef.current.scrollTop;
    const bunHeight = bunsRef.current.offsetHeight;
    const sauceHeight = saucesRef.current.offsetHeight;
    if (scrollPos < bunHeight + 40) setCurrent("bun");
    else if (scrollPos < sauceHeight + bunHeight + 40 * 2) setCurrent("sauce");
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
    <article
      className={`text text_type_main-default ${ingredientsStyles["IngredientsColumn"]}`}
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
        <section
          ref={bunsRef}
          className={`${ingredientsStyles["IngredientsArea"]}`}
        >
          <h2
            className={`text text_type_main-medium ${ingredientsStyles["IngredientsArea-Header"]}`}
          >
            Булки
          </h2>
          <div className={`${ingredientsStyles["IngredientsArea-List"]}`}>
            {hardcodeData
              .filter((elem) => {
                return elem.type === "bun";
              })
              .map((ingredient) => {
                return (
                  <IngredientsItem
                    key={ingredient["_id"]}
                    ingredientData={ingredient}
                  ></IngredientsItem>
                );
              })}
          </div>
        </section>
        <section
          ref={saucesRef}
          className={`${ingredientsStyles["IngredientsArea"]}`}
        >
          <h2
            className={`text text_type_main-medium ${ingredientsStyles["IngredientsArea-Header"]}`}
          >
            Соусы
          </h2>
          <div className={`${ingredientsStyles["IngredientsArea-List"]}`}>
            {hardcodeData
              .filter((elem) => {
                return elem.type === "sauce";
              })
              .map((ingredient) => {
                return (
                  <IngredientsItem
                    key={ingredient["_id"]}
                    ingredientData={ingredient}
                  ></IngredientsItem>
                );
              })}
          </div>
        </section>
        <section
          ref={toppingsRef}
          className={`${ingredientsStyles["IngredientsArea"]}`}
        >
          <h2
            className={`text text_type_main-medium ${ingredientsStyles["IngredientsArea-Header"]}`}
          >
            Начинка
          </h2>
          <div className={`${ingredientsStyles["IngredientsArea-List"]}`}>
            {hardcodeData
              .filter((elem) => {
                return elem.type === "main";
              })
              .map((ingredient) => {
                return (
                  <IngredientsItem
                    key={ingredient["_id"]}
                    ingredientData={ingredient}
                  ></IngredientsItem>
                );
              })}
          </div>
        </section>
      </div>
    </article>
  );
};
BurgerIngredients.propTypes = ingredientsDataType;
