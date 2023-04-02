//Types
import { TConstructorIngredient, TRequestData } from "./types";

//React
import { useMemo, FC } from "react";

//UI elements
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";

//Components
import { OrderDetails } from "../order-details/order-details";
import { Modal } from "../modal/modal";
import { Topping } from "./topping/topping";

//Styles
import burgerConstructorStyles from "./burger-constructor.module.css";

//Redux
import { useDispatch, useSelector } from "../../services/create-store";
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

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onDropHandler = (item: TConstructorIngredient) => {
    dispatch(addIngredient(item, crypto.randomUUID()));
  };
  const [, dropRef] = useDrop({
    accept: "ingredient",
    drop(item: TConstructorIngredient) {
      onDropHandler(item);
    },
  });

  const constructorIngredients = useSelector(
    (store) => store.constructorReducer.data
  );
  const constructorBun = useSelector((store) => store.constructorReducer.bun);

  const totalCost: number =
    (constructorIngredients[0]
      ? [...constructorIngredients].reduce((acc, elem) => {
          return acc + elem.price;
        }, 0)
      : 0) + (constructorBun ? constructorBun.price * 2 : 0);
  const showOrder = useSelector((store) => store.orderReducer.isShown);

  const isAuth: boolean = useSelector((store: any) =>
    store.authReducer.user ? true : false
  );

  const onOrderClick = (): void => {
    if (isAuth) {
      let dataToSend: TRequestData = [];

      if (constructorBun) dataToSend.push(constructorBun._id);
      dataToSend = dataToSend.concat(
        constructorIngredients.map((elem) => {
          return elem["_id"];
        })
      );
      if (constructorBun)
        constructorBun._id && dataToSend.push(constructorBun._id);

      if (!constructorBun) {
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

  const hideDetails = (): void => {
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
        {constructorBun ? (
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
        ) : null}
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
        {constructorBun ? (
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
        ) : null}
        {/*-Order Section-----------------------------------------------*/}
        <section className={`${burgerConstructorStyles.OrderSection}`}>
          <div className={`${burgerConstructorStyles.TotalPrice}`}>
            <p className="text text_type_digits-medium">{totalCost}</p>
            <CurrencyIcon type="primary" />
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
