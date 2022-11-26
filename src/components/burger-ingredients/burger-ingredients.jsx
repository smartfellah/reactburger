import {
  CurrencyIcon,
  Counter,
  Tab,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { hardcodeData } from "../../utils/hardcodeData";
import { useState } from "react";
import { IngredientsItem } from "./ingredients-item/ingredients-item";
import ingredientsStyles from "./burger-ingredients.module.css";
export const BurgerIngredients = () => {
  const [current, setCurrent] = useState("one");
  return (
    <div
      className={`text text_type_main-default ${ingredientsStyles["IngredientsColumn"]}`}
    >
      <div
        className={`text text_type_main-large ${ingredientsStyles["IngredientsColumn-Header"]}`}
      >
        <h1>Соберите бургер</h1>
      </div>
      <div className={`${ingredientsStyles["IngredientsColumn-Tab"]}`}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          One
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Two
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Three
        </Tab>
      </div>
      <div className={`${ingredientsStyles["IngredientsColumn-Body"]}`}>
        <div className={`${ingredientsStyles["BunArea"]}`}>
          <h2
            className={`text text_type_main-medium ${ingredientsStyles["BunArea-Header"]}`}
          >
            Булки
          </h2>
          <div className={`${ingredientsStyles["BunArea-List"]}`}>
            {hardcodeData
              .filter((elem) => {
                return elem.type === "bun";
              })
              .map((ingredient) => {
                return (
                  <IngredientsItem
                    key={ingredient["_id"]}
                    data={ingredient}
                  ></IngredientsItem>
                );
              })}
          </div>
        </div>
        <div className={`${ingredientsStyles["SauceArea"]}`}>
          <h2
            className={`text text_type_main-medium ${ingredientsStyles["SauceArea-Header"]}`}
          >
            Соусы
          </h2>
          <div className={`${ingredientsStyles["SauceArea-List"]}`}></div>
        </div>
        <div className={`${ingredientsStyles["ToppingArea"]}`}>
          <h2
            className={`text text_type_main-medium ${ingredientsStyles["ToppingArea-Header"]}`}
          >
            Начинка
          </h2>
          <div className={`${ingredientsStyles["ToppingArea-List"]}`}></div>
        </div>
      </div>
    </div>
  );
};
