import ingredientsAreaStyles from "./ingredients-area.module.css";
import { IngredientsItem } from "../ingredients-item/ingredients-item";
export const IngredientsArea = ({ areaRef, type, ingredientsData }) => {
  const areaTitle =
    type === "bun" ? "Булки" : type === "sauce" ? "Соусы" : "Начинка";
  return (
    <section
      ref={areaRef}
      className={`${ingredientsAreaStyles["IngredientsArea"]}`}
    >
      <h2
        className={`text text_type_main-medium ${ingredientsAreaStyles["IngredientsArea-Header"]}`}
      >
        {areaTitle}
      </h2>
      <div className={`${ingredientsAreaStyles["IngredientsArea-List"]}`}>
        {ingredientsData
          .filter((elem) => {
            return elem.type === type;
          })
          .map((ingredient) => {
            return (
              <IngredientsItem
                key={ingredient["_id"]}
                singleIngredientData={ingredient}
              ></IngredientsItem>
            );
          })}
      </div>
    </section>
  );
};
