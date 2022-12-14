import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import modalStyles from "./modal.module.css";
import { useEffect } from "react";

const modalRoot = document.getElementById("modal");

export const Modal = ({ children, modalTitle, closePopup }) => {
  useEffect(() => {
    const onEsc = (e) => {
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
      <div className={`${modalStyles.Modal}`}>
        <div
          className={`${modalStyles["Modal-Header"]} text text_type_main-large`}
        >
          <h2>{modalTitle}</h2>
          <CloseIcon onClick={closePopup} />
        </div>
        <div className={`${modalStyles["Modal-Body"]}`}>{children}</div>
      </div>
    </>,
    modalRoot
  );
};
Modal.propTypes = {
  children: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
  modalTitle: PropTypes.string,
  closePopup: PropTypes.func.isRequired,
};
