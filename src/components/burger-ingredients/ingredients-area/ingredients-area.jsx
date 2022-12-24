import { useMemo } from "react";
import ingredientsAreaStyles from "./ingredients-area.module.css";
import { IngredientsItem } from "../ingredients-item/ingredients-item";
import PropTypes from "prop-types";
import { useSelector } from "react-redux/es/hooks/useSelector";
export const IngredientsArea = ({ areaRef, type }) => {
  const ingredientsData = useSelector((store) => store.ingredientsReducer.data);

  const areaTitle =
    type === "bun" ? "Булки" : type === "sauce" ? "Соусы" : "Начинка";
  return (
    <section
      ref={areaRef}
      className={`${ingredientsAreaStyles.IngredientsArea}`}
    >
      <h2
        className={`text text_type_main-medium ${ingredientsAreaStyles["IngredientsArea-Header"]}`}
      >
        {areaTitle}
      </h2>
      <div className={`${ingredientsAreaStyles["IngredientsArea-List"]}`}>
        {useMemo(
          () =>
            ingredientsData
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
              }),
          [ingredientsData]
        )}
      </div>
    </section>
  );
};

IngredientsArea.propTypes = {
  type: PropTypes.string.isRequired,
  areaRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
};
