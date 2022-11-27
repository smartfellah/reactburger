import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import { IngredientsItem } from "./ingredients-item/ingredients-item";
import ingredientsStyles from "./burger-ingredients.module.css";
import { ingredientsDataType } from "../../utils/types";
export const BurgerIngredients = ({ hardcodeData }) => {
  const [current, setCurrent] = useState("bun");
  const handleTabClick = (e) => {
    setCurrent(e);
    if (e === "bun") {
      document.getElementById("buns").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    } else if (e === "sauce") {
      const target = document.getElementById("sauces");
      target.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    } else
      document.getElementById("toppings").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
  };
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
      <div className={`${ingredientsStyles["IngredientsColumn-Body"]}`}>
        <section
          id="buns"
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
          id="sauces"
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
          id="toppings"
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
