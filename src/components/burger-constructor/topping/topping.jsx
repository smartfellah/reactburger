import toppingStyles from "./topping.module.css";
import { useDrag, useDrop } from "react-dnd/dist/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_FROM_CONSTRUCTOR,
  SWAP_ELEMENTS,
} from "../../../services/actions/constructor-actions";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

export const Topping = ({ ingredient, position }) => {
  const dispatch = useDispatch();

  const [{ isDrag }, innerDragRef] = useDrag({
    type: "constructorIngredient",
    item: {
      dragPosition: position,
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const constructorData = useSelector((store) => store.constructorReducer.data);

  const [, innerDropRef] = useDrop({
    accept: "constructorIngredient",
    drop({ dragPosition }, monitor) {
      dispatch({
        type: SWAP_ELEMENTS,
        payload: {
          dragFrom: dragPosition,
          dropTo: position,
        },
      });
    },
  });

  const onDeleteClick = (ingredientData) => {
    dispatch({
      type: DELETE_FROM_CONSTRUCTOR,
      payload: { ...ingredientData },
    });
  };

  const transparentStyle = isDrag && { opacity: 0 };

  return (
    <div
      ref={(elem) => {
        innerDragRef(elem);
        innerDropRef(elem);
      }}
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
