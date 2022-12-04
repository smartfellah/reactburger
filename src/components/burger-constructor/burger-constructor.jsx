import {
  CurrencyIcon,
  DragIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { ingredientType } from "../../utils/types";
import PropTypes from "prop-types";
export const BurgerConstructor = ({ ingredientsData }) => {
  return (
    <article className={`${burgerConstructorStyles["ConstructorColumn"]}`}>
      <section className={`${burgerConstructorStyles["Bun"]}`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={
            ingredientsData.find((elem) => {
              return elem.name === "Краторная булка N-200i";
            }).image
          }
        />
      </section>
      <section className={`${burgerConstructorStyles["ConstructorList"]}`}>
        {ingredientsData
          .filter((elem) => {
            return elem.type !== "bun";
          })
          .map((ingredient) => {
            return (
              <div
                key={ingredient["_id"]}
                className={`${burgerConstructorStyles["ListElement"]}`}
              >
                <div
                  className={`${burgerConstructorStyles["DragIconWrapper"]}`}
                >
                  <DragIcon />
                </div>
                <ConstructorElement
                  isLocked={false}
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                ></ConstructorElement>
              </div>
            );
          })}
      </section>
      <section className={`${burgerConstructorStyles["Bun"]}`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={
            ingredientsData.find((elem) => {
              return elem.name === "Краторная булка N-200i";
            }).image
          }
        />
      </section>
      <section className={`${burgerConstructorStyles["OrderSection"]}`}>
        <div className={`${burgerConstructorStyles["TotalPrice"]}`}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon></CurrencyIcon>
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </section>
    </article>
  );
};
BurgerConstructor.propTypes = {
  ingredientsData: PropTypes.arrayOf(ingredientType),
};
