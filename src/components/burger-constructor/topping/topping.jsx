import toppingStyles from "./topping.module.css";
import { useDrag, useDrop } from "react-dnd/dist/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_FROM_CONSTRUCTOR,
  SWAP_ELEMENTS,
} from "../../../services/actions/constructor-actions";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";

export const Topping = ({ ingredient, position }) => {
  const dispatch = useDispatch();

  const ref = useRef(null);

  const [{ isDrag }, innerDragRef] = useDrag({
    type: "constructorIngredient",
    item: () => {
      return { position };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const [, innerDropRef] = useDrop({
    accept: "constructorIngredient",
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragFrom = item.position;
      const dropTo = position;

      if (dragFrom === dropTo) {
        return;
      }

      dispatch({
        type: SWAP_ELEMENTS,
        payload: { dragFrom, dropTo },
      });

      item.position = dropTo;
    },
  });

  const onDeleteClick = (ingredientData) => {
    dispatch({
      type: DELETE_FROM_CONSTRUCTOR,
      payload: { ...ingredientData },
    });
  };

  const transparentStyle = isDrag && { opacity: 0 };

  innerDragRef(innerDropRef(ref));

  return (
    <div
      ref={ref}
      style={{ ...transparentStyle }}
      key={ingredient.Uid}
      className={`${toppingStyles.ListElement}`}
    >
      <div className={`${toppingStyles.DragIconWrapper}`}>
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
};
