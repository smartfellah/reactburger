import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { HomePage } from "./home";

import styles from "./page-styles/single-ingredient.module.css";

export function SingleIngredient() {
  const location = useLocation();

  const ingredientsData = useSelector((store) => {
    return [...store.ingredientsReducer.data];
  });

  const { id } = useParams();

  const details = ingredientsData.filter((element) => {
    return element._id === id;
  })[0];

  return location?.state?.ingredientDetails ? (
    <HomePage />
  ) : (
    details && (
      <>
        <div className={`${styles.details_wrapper}`}>
          <h1 className={`${styles.details_header} text text_type_main-large`}>
            Детали ингредиента
          </h1>
          <article className={`${styles.details_list}`}>
            <img
              className={`${styles.ingredient_image}`}
              src={details.image}
              alt="ingredient"
            />
            <h2
              className={`${styles.ingredient_name} text text_type_main-medium`}
            >
              {details.name}
            </h2>
            <section className={`${styles.ingredient_nutrition}`}>
              <div className="text text_type_main-default text_color_inactive">
                <h4>Калории, ккал</h4>
                <p>{details.calories}</p>
              </div>
              <div className="text text_type_main-default text_color_inactive">
                <h4>Белки, г</h4>
                <p>{details.proteins}</p>
              </div>
              <div className="text text_type_main-default text_color_inactive">
                <h4>Жиры, г</h4>
                <p>{details.fat}</p>
              </div>
              <div className="text text_type_main-default text_color_inactive">
                <h4>Углеводы, г</h4>
                <p>{details.carbohydrates}</p>
              </div>
            </section>
          </article>
        </div>
      </>
    )
  );
}
