import {
  CurrencyIcon,
  DragIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyles from "./burger-constructor.module.css";
import { hardcodeData } from "../../utils/hardcodeData";
export const BurgerConstructor = () => {
  return (
    <div className={`${burgerConstructorStyles["ConstructorColumn"]}`}>
      <div className={`${burgerConstructorStyles["Bun"]}`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={
            hardcodeData.find((elem) => {
              return elem.name === "Краторная булка N-200i";
            }).image
          }
        />
      </div>
      <div className={`${burgerConstructorStyles["ConstructorList"]}`}>
        {hardcodeData
          .filter((elem) => {
            return elem.type !== "bun";
          })
          .map((ingredient) => {
            return (
              <div
                key={ingredient["_id"]}
                className={`${burgerConstructorStyles["ListElement"]}`}
              >
                <DragIcon></DragIcon>
                <ConstructorElement
                  isLocked={false}
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                ></ConstructorElement>
              </div>
            );
          })}
      </div>
      <div className={`${burgerConstructorStyles["Bun"]}`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={
            hardcodeData.find((elem) => {
              return elem.name === "Краторная булка N-200i";
            }).image
          }
        />
      </div>
      <div className={`${burgerConstructorStyles["OrderSection"]}`}>
        <div className={`${burgerConstructorStyles["TotalPrice"]}`}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon></CurrencyIcon>
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};
