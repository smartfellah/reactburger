import ingredientsAreaStyles from "./ingredients-area.module.css";
import { IngredientsItem } from "../ingredients-item/ingredients-item";
import PropTypes from "prop-types";
import { ingredientType } from "../../../utils/types";
export const IngredientsArea = ({
  areaRef,
  type,
  ingredientsData,
  toggleShowDetails,
}) => {
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
                toggleShowDetails={toggleShowDetails}
              ></IngredientsItem>
            );
          })}
      </div>
    </section>
  );
};

IngredientsArea.propTypes = {
  ingredientsData: PropTypes.arrayOf(ingredientType).isRequired,
  toggleShowDetails: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  areaRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
};
