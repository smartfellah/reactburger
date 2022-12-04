import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css";
const modalRoot = document.getElementById("modal");
export const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className={`${modalStyles["Modal"]}`}>
      <div className={`${modalStyles["Modal-Content"]}`}>
        <div
          className={`${modalStyles["Modal-Header"]} text text_type_main-large`}
        >
          <h2>Загаловак</h2>
          <CloseIcon></CloseIcon>
        </div>
        <div className={`${modalStyles["Modal-Body"]}`}>{children}</div>
      </div>
    </div>,

    modalRoot
  );
};
