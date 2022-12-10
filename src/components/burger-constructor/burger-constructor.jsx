import { useState, useContext } from "react";
import PropTypes from "prop-types";

//Context
import { ConstructorContext } from "../../context/constructor-context";

//API
import { dataURL } from "../../services/endpoint";
import { checkResponse } from "../../utils/check-response";

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

  const onOrderClick = () => {
    const postOrder = async () => {
      try {
        const ingredientsToSend = constructorState.usedIngredients.map(
          (elem) => {
            return elem["_id"];
          }
        );
        constructorState.bun.name &&
          ingredientsToSend.push(constructorState.bun["_id"]);
        if (!ingredientsToSend.length) {
          throw new Error("пустой заказ");
        }
        const response = await fetch(`${dataURL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ingredients: constructorState.usedIngredients.map((elem) => {
              return elem["_id"];
            }),
          }),
        });
        const responseData = await checkResponse(response);
        constructorDispatcher({
          type: "makeOrder",
          lastOrderNumber: responseData.order.number,
        });
        toggleShowOrder();
      } catch (error) {
        alert("Ошибка при загрузке данных: " + error);
      }
    };
    postOrder();
  };

  return (
    <>
      <article className={`${burgerConstructorStyles["ConstructorColumn"]}`}>
        {/*-Top Bun Section-----------------------------------------------*/}
        <section className={`${burgerConstructorStyles["Bun"]}`}>
          {constructorState.bun.name && (
            <ConstructorElement
              type={"top"}
              text={constructorState.bun.name}
              thumbnail={constructorState.bun.image}
              price={constructorState.bun.price}
              isLocked={true}
            />
          )}
        </section>
        {/*-Ingredients Section-------------------------------------------*/}
        <section className={`${burgerConstructorStyles["ConstructorList"]}`}>
          {constructorState.usedIngredients.map((ingredient) => {
            return (
              <div
                key={ingredient.Uid}
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
          {constructorState.bun.name && (
            <ConstructorElement
              text={constructorState.bun.name}
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
            onClick={onOrderClick}
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
