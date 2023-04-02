//React
import ReactDOM from "react-dom";
import { useEffect, FC } from "react";

//UI
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

//Components
import { ModalOverlay } from "../modal-overlay/modal-overlay";

//Types
import { ModalProps } from "./types";

const modalRoot: HTMLElement | null = document.getElementById("modal");

export const Modal: FC<ModalProps> = ({ children, modalTitle, closePopup }) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent): void => {
      e.key === "Escape" && closePopup();
    };

    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("keydown", onEsc);
    };
  });

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={closePopup} />
      <div className={`${modalStyles.Modal}`} style={{ zIndex: 1000 }}>
        <div
          className={`${modalStyles["Modal-Header"]} text text_type_main-large`}
        >
          <h2>{modalTitle}</h2>
          <CloseIcon type="primary" onClick={closePopup} />
        </div>
        <div className={`${modalStyles["Modal-Body"]}`}>{children}</div>
      </div>
    </>,
    modalRoot!
  );
};
