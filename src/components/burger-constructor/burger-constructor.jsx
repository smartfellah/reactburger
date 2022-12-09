import { useState, useContext } from "react";
import PropTypes from "prop-types";

//Context
import { ConstructorContext } from "../../context/constructor-context";

//UI elements
import {
  CurrencyIcon,
  DragIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

//Components
import { OrderDetails } from "../order-details/order-details";
import { Modal } from "../modal/modal";

//Styles
import burgerConstructorStyles from "./burger-constructor.module.css";

//Data
import { ingredientType } from "../../utils/types";

export const BurgerConstructor = () => {
  const [constructorState, constructorDispatcher] =
    useContext(ConstructorContext);

  const [showOrder, setShowOrder] = useState();
  const toggleShowOrder = () => {
    setShowOrder(!showOrder);
  };

  return (
    <>
      <article className={`${burgerConstructorStyles["ConstructorColumn"]}`}>
        <section className={`${burgerConstructorStyles["Bun"]}`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={
              constructorState.allIngredients.find((elem) => {
                return elem.name === "Краторная булка N-200i";
              }).image
            }
          />
        </section>
        <section className={`${burgerConstructorStyles["ConstructorList"]}`}>
          {constructorState.usedIngredients
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
              constructorState.allIngredients.find((elem) => {
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
          <Button
            onClick={toggleShowOrder}
            htmlType="button"
            type="primary"
            size="large"
          >
            Оформить заказ
          </Button>
        </section>
      </article>
      {showOrder ? (
        <Modal closePopup={toggleShowOrder}>
          <OrderDetails></OrderDetails>
        </Modal>
      ) : null}
    </>
  );
};
BurgerConstructor.propTypes = {
  ingredientsData: PropTypes.arrayOf(ingredientType),
};
