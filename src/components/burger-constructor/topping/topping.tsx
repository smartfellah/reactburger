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
import { useDispatch } from "react-redux";

type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  Uid: string;
};

interface IToppingProps {
  ingredient: TIngredient;
  position: number;
}

export const Topping: FC<IToppingProps> = ({ ingredient, position }) => {
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

  const onDeleteClick = (ingredientData: TIngredient): void => {
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
