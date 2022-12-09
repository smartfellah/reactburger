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
  const [constructorState] = useContext(ConstructorContext);

  const [showOrder, setShowOrder] = useState();
  const toggleShowOrder = () => {
    setShowOrder(!showOrder);
  };

  return (
    <>
      <article className={`${burgerConstructorStyles["ConstructorColumn"]}`}>
        {/*-Top Bun Section-----------------------------------------------*/}
        <section className={`${burgerConstructorStyles["Bun"]}`}>
          {constructorState.bun.text && (
            <ConstructorElement type={"top"} isLocked={true} />
          )}
        </section>
        {/*-Ingredients Section-------------------------------------------*/}
        <section className={`${burgerConstructorStyles["ConstructorList"]}`}>
          {constructorState.usedIngredients.map((ingredient) => {
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
        {/*-Bottom Bun Section--------------------------------------------*/}
        <section className={`${burgerConstructorStyles["Bun"]}`}>
          {constructorState.bun.text && (
            <ConstructorElement
              text={constructorState.bun.text}
              price={constructorState.bun.price}
              thumbnail={constructorState.bun.image}
              type={"bottom"}
              isLocked={true}
            />
          )}
        </section>
        {/*-Order Section-----------------------------------------------*/}
        <section className={`${burgerConstructorStyles["OrderSection"]}`}>
          <div className={`${burgerConstructorStyles["TotalPrice"]}`}>
            <p className="text text_type_digits-medium">
              {constructorState.totalCost}
            </p>
            <CurrencyIcon />
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
      {/*-Modal-------------------------------------------------------*/}
      {showOrder ? (
        <Modal closePopup={toggleShowOrder}>
          <OrderDetails />
        </Modal>
      ) : null}
    </>
  );
};
BurgerConstructor.propTypes = {
  ingredientsData: PropTypes.arrayOf(ingredientType),
};
