import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalOverlay } from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import modalStyles from "./modal.module.css";
import { useEffect } from "react";
const modalRoot = document.getElementById("modal");
export const Modal = ({ children, toggleShowDetails, modalTitle }) => {
  useEffect(() => {
    const onEsc = (e) => {
      e.key === "Escape" && onClose();
    };

    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("keydown", onEsc);
    };
  });
  const onClose = () => {
    toggleShowDetails();
  };
  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClick={onClose}></ModalOverlay>
      <div className={`${modalStyles["Modal"]}`}>
        <div
          className={`${modalStyles["Modal-Header"]} text text_type_main-large`}
        >
          <h2>{modalTitle}</h2>
          <CloseIcon onClick={onClose}></CloseIcon>
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
  toggleShowDetails: PropTypes.func.isRequired,
  modalTitle: PropTypes.string,
};
