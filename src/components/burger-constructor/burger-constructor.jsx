import { useMemo } from "react";

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

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  sendOrder,
  SHOW_ORDER_DETAILS,
} from "../../services/actions/order-actions";
import { useDrop } from "react-dnd/dist/hooks";
import {
  addIngredient,
  DELETE_FROM_CONSTRUCTOR,
} from "../../services/actions/constructor-actions";

export const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const onDropHandler = (item) => {
    dispatch(addIngredient(item));
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
  const totalCost = useSelector((store) => store.constructorReducer.totalCost);
  const showOrder = useSelector((store) => store.orderReducer.isShown);

  const onOrderClick = () => {
    dispatch(sendOrder());
    dispatch({
      type: SHOW_ORDER_DETAILS,
    });
  };

  const onDeleteClick = (ingredientData) => {
    dispatch({
      type: DELETE_FROM_CONSTRUCTOR,
      payload: { ...ingredientData },
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
              constructorIngredients.map((ingredient) => {
                return (
                  <div
                    key={ingredient.Uid}
                    className={`${burgerConstructorStyles.ListElement}`}
                  >
                    <div
                      className={`${burgerConstructorStyles.DragIconWrapper}`}
                    >
                      <DragIcon />
                    </div>
                    <ConstructorElement
                      isLocked={false}
                      text={ingredient.name}
                      price={ingredient.price}
                      thumbnail={ingredient.image}
                      handleClose={() => onDeleteClick(ingredient)}
                    ></ConstructorElement>
                  </div>
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
        <Modal>
          <OrderDetails />
        </Modal>
      ) : null}
    </>
  );
};
