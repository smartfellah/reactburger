//React
import { FC, useMemo } from "react";

//Components
import { IngredientsItem } from "../ingredients-item/ingredients-item";

//Styles
import ingredientsAreaStyles from "./ingredients-area.module.css";

//Redux
import { useSelector } from "react-redux/es/hooks/useSelector";

//Types
import { TIngredientsAreaProps, TIngredientsData } from "../types";

export const IngredientsArea: FC<TIngredientsAreaProps> = ({
  areaRef,
  type,
}) => {
  const ingredientsData: TIngredientsData = useSelector(
    (store: any) => store.ingredientsReducer.data
  );

  const areaTitle: string =
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
