//UI
import toppingStyles from "./topping.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

//DND
import { useDrag, useDrop } from "react-dnd/dist/hooks";

//React
import { useRef, FC } from "react";

//Redux
import {
  DELETE_FROM_CONSTRUCTOR,
  SWAP_ELEMENTS,
} from "../../../services/actions/constructor-actions";
import { useDispatch } from "../../../services/create-store";

//Types
import { TConstructorIngredient, TToppingProps } from "../types";

export const Topping: FC<TToppingProps> = ({ ingredient, position }) => {
  const dispatch = useDispatch();

  const ref = useRef<HTMLDivElement>(null);

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
    hover(item: { position: number }) {
      if (!ref.current) {
        return;
      }
      const dragFrom: number = item.position;
      const dropTo: number = position;

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

  const onDeleteClick = (ingredientData: TConstructorIngredient): void => {
    dispatch({
      type: DELETE_FROM_CONSTRUCTOR,
      payload: { ...ingredientData },
    });
  };

  const transparentStyle: { opacity: number } | null = isDrag
    ? { opacity: 0 }
    : null;

  innerDragRef(innerDropRef(ref));

  return (
    <div
      ref={ref}
      style={{ ...transparentStyle }}
      key={ingredient.Uid}
      className={`${toppingStyles.ListElement}`}
    >
      <div className={`${toppingStyles.DragIconWrapper}`}>
        <DragIcon type="primary" />
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
