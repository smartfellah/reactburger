//React
import { useState, useRef, useEffect, RefObject } from "react";

//Components
import { Modal } from "../modal/modal";
import { IngredientsArea } from "./ingredients-area/ingredients-area";
import { IngredientDetails } from "../ingredient-details/ingredient-details";

//UI
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./burger-ingredients.module.css";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  HIDE_INGREDIENT_DETAILS,
  SHOW_INGREDIENT_DETAILS,
} from "../../services/actions/single-ingredient-actions";
import { Dispatch } from "redux";

//Router
import { useLocation, useNavigate } from "react-router-dom";

export const BurgerIngredients = () => {
  const dispatch = useDispatch<Dispatch<any>>();

  const showDetails: boolean = useSelector(
    (store: any) => store.singleIngredientReducer.isShown
  );

  const location = useLocation();
  const navigate = useNavigate();

  const hideDetails = (): void => {
    dispatch({ type: HIDE_INGREDIENT_DETAILS });
    navigate("/");
  };

  const [current, setCurrent] = useState<string>("bun");
  const bunsRef = useRef<HTMLElement>(null);
  const saucesRef = useRef<HTMLElement>(null);
  const toppingsRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRef = useRef<HTMLElement>(null);

  const handleTabClick = (e: string): void => {
    setCurrent(e);
    if (e === "bun") {
      setCurrent("bun");
      scrollRef.current!.scroll({
        top: 0,
        behavior: "smooth",
      });
    } else if (e === "sauce") {
      setCurrent("sauce");
      scrollRef.current!.scroll({
        top: bunsRef.current!.offsetHeight,
        behavior: "smooth",
      });
    } else {
      setCurrent("main");
      scrollRef.current!.scroll({
        top: bunsRef.current!.offsetHeight + saucesRef.current!.offsetHeight,
        behavior: "smooth",
      });
    }
  };

  const ingredientScrollHandler = () => {
    const getAreaPos = (
      areaRef: RefObject<HTMLElement>,
      tabRef: RefObject<HTMLElement>
    ) => {
      const tabBottom = tabRef.current!.getBoundingClientRect().bottom;
      return Math.abs(
        tabBottom -
          Math.min(
            areaRef.current!.getBoundingClientRect().top,
            areaRef.current!.getBoundingClientRect().bottom
          )
      );
    };
    const bunPos = getAreaPos(bunsRef, tabRef);
    const saucePos = getAreaPos(saucesRef, tabRef);
    const toppingPos = getAreaPos(toppingsRef, tabRef);
    const areas = [
      { name: "bun", pos: bunPos },
      { name: "sauce", pos: saucePos },
      { name: "topping", pos: toppingPos },
    ];
    areas.sort((a, b) => {
      return a.pos - b.pos;
    });
    setCurrent(areas[0].name);
  };

  useEffect(() => {
    const scrolledNode = scrollRef.current;
    scrollRef.current!.addEventListener("scroll", ingredientScrollHandler);
    return () => {
      scrolledNode!.removeEventListener("scroll", ingredientScrollHandler);
    };
  }, []);

  useEffect(
    function modalFromStateEffect(): void {
      if (location?.state?.ingredientDetails) {
        dispatch({
          type: SHOW_INGREDIENT_DETAILS,
          payload: { ...location.state.ingredientDetails },
        });
      }
    },
    [dispatch, location?.state?.ingredientDetails]
  );

  return (
    <>
      <article
        className={`text text_type_main-default ${ingredientsStyles.IngredientsColumn}`}
      >
        <header
          className={`text text_type_main-large ${ingredientsStyles["IngredientsColumn-Header"]}`}
        >
          <h1>Соберите бургер</h1>
        </header>
        <section
          className={`${ingredientsStyles["IngredientsColumn-Tab"]}`}
          ref={tabRef}
        >
          <Tab value="bun" active={current === "bun"} onClick={handleTabClick}>
            Булки
          </Tab>
          <Tab
            value="sauce"
            active={current === "sauce"}
            onClick={handleTabClick}
          >
            Соусы
          </Tab>
          <Tab
            value="topping"
            active={current === "topping"}
            onClick={handleTabClick}
          >
            Начинки
          </Tab>
        </section>
        <div
          ref={scrollRef}
          className={`${ingredientsStyles["IngredientsColumn-Body"]}`}
        >
          <IngredientsArea areaRef={bunsRef} type="bun" />
          <IngredientsArea areaRef={saucesRef} type="sauce" />
          <IngredientsArea areaRef={toppingsRef} type="main" />
        </div>
      </article>
      {showDetails ? (
        <>
          <Modal modalTitle={"Детали ингредиента"} closePopup={hideDetails}>
            <IngredientDetails />
          </Modal>
        </>
      ) : null}
    </>
  );
};
