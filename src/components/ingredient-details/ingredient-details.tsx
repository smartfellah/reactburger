//UI
import detailsStyles from "./ingredient-details.module.css";

//Redux
import { useSelector } from "../../services/create-store";

//Types
import { IngredientDetailsObject } from "./types";

export const IngredientDetails = () => {
  const details = useSelector((store) => store.singleIngredientReducer.data);

  return (
    <article className={`${detailsStyles.DetailsList}`}>
      <img
        className={`${detailsStyles["DetailsList-Image"]}`}
        src={details!.image}
        alt="ingredient"
      />
      <h3
        className={`${detailsStyles["DetailsList-Name"]} text text_type_main-medium`}
      >
        {details!.name}
      </h3>
      <section className={`${detailsStyles["DetailsList-Nutrition"]}`}>
        <div className="text text_type_main-default text_color_inactive">
          <h4>Калории, ккал</h4>
          <p>{details!.calories}</p>
        </div>
        <div className="text text_type_main-default text_color_inactive">
          <h4>Белки, г</h4>
          <p>{details!.proteins}</p>
        </div>
        <div className="text text_type_main-default text_color_inactive">
          <h4>Жиры, г</h4>
          <p>{details!.fat}</p>
        </div>
        <div className="text text_type_main-default text_color_inactive">
          <h4>Углеводы, г</h4>
          <p>{details!.carbohydrates}</p>
        </div>
      </section>
    </article>
  );
};
