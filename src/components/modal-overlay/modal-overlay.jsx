import modalOverlayStyles from "./modal-overlay.module.css";
import ReactDOM from "react-dom";
const modalRoot = document.getElementById("modal");
export const ModalOverlay = ({ onClick }) => {
  return ReactDOM.createPortal(
    <div
      onClick={onClick}
      className={`${modalOverlayStyles["ModalOverlay"]}`}
    ></div>,
    modalRoot
  );
};
