import { useMemo } from "react";

//UI elements
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

//Components
import { OrderDetails } from "../order-details/order-details";
import { Modal } from "../modal/modal";

//Styles
import burgerConstructorStyles from "./burger-constructor.module.css";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  HIDE_ORDER_DETAILS,
  sendOrder,
  SEND_ORDER_ERROR,
  SHOW_ORDER_DETAILS,
} from "../../services/actions/order-actions";
import {
  addIngredient,
  CLEAR_CONSTRUCTOR,
} from "../../services/actions/constructor-actions";

//DND
import { useDrop } from "react-dnd/dist/hooks";

//Router
import { useNavigate } from "react-router";

import { Topping } from "./topping/topping";

export const BurgerConstructor = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onDropHandler = (item) => {
    dispatch(addIngredient(item, crypto.randomUUID()));
  };
  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
  });

  const constructorIngredients = useSelector(
    (store) => store.constructorReducer.data
  );
  const constructorBun = useSelector((store) => store.constructorReducer.bun);
  const totalCost =
    (constructorIngredients[0]
      ? [...constructorIngredients].reduce((acc, elem) => {
          return acc + elem.price;
        }, 0)
      : 0) + (constructorBun.price ? constructorBun.price * 2 : 0);
  const showOrder = useSelector((store) => store.orderReducer.isShown);

  const isAuth = useSelector((store) =>
    store.authReducer.user ? true : false
  );

  const onOrderClick = () => {
    if (isAuth) {
      let dataToSend = [];

      constructorBun._id && dataToSend.push(constructorBun._id);
      dataToSend = dataToSend.concat(
        constructorIngredients.map((elem) => {
          return elem["_id"];
        })
      );
      constructorBun._id && dataToSend.push(constructorBun._id);

      if (!constructorBun._id) {
        dispatch({ type: SEND_ORDER_ERROR });
        alert("В бургер нужно добавить булку");
      } else {
        dispatch(sendOrder(dataToSend));
        dispatch({
          type: SHOW_ORDER_DETAILS,
        });
      }
    } else navigate("/login", { replace: true });
  };

  const hideDetails = () => {
    dispatch({
      type: HIDE_ORDER_DETAILS,
    });
    dispatch({
      type: CLEAR_CONSTRUCTOR,
    });
  };

  return (
    <>
      <article
        className={`${burgerConstructorStyles.ConstructorColumn}`}
        ref={dropRef}
      >
        {/*-Top Bun Section-----------------------------------------------*/}
        <section className={`${burgerConstructorStyles.Bun}`}>
          {constructorBun.name && (
            <ConstructorElement
              type={"top"}
              text={constructorBun.name + " (верх)"}
              thumbnail={constructorBun.image}
              price={constructorBun.price}
              isLocked={true}
            />
          )}
        </section>
        {/*-Ingredients Section-------------------------------------------*/}
        <section className={`${burgerConstructorStyles.ConstructorList}`}>
          {useMemo(
            () =>
              constructorIngredients.map((ingredient, index) => {
                return (
                  <Topping
                    position={index}
                    key={ingredient.Uid}
                    ingredient={ingredient}
                  />
                );
              }),
            [constructorIngredients]
          )}
        </section>
        {/*-Bottom Bun Section--------------------------------------------*/}
        <section className={`${burgerConstructorStyles.Bun}`}>
          {constructorBun.name && (
            <ConstructorElement
              text={constructorBun.name + " (низ)"}
              price={constructorBun.price}
              thumbnail={constructorBun.image}
              type={"bottom"}
              isLocked={true}
            />
          )}
        </section>
        {/*-Order Section-----------------------------------------------*/}
        <section className={`${burgerConstructorStyles.OrderSection}`}>
          <div className={`${burgerConstructorStyles.TotalPrice}`}>
            <p className="text text_type_digits-medium">{totalCost}</p>
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
        <Modal closePopup={hideDetails}>
          <OrderDetails />
        </Modal>
      ) : null}
    </>
  );
};
