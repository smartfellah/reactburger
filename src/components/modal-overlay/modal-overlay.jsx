import modalOverlayStyles from "./modal-overlay.module.css";
import ReactDOM from "react-dom";
const modalRoot = document.getElementById("modal");
export const ModalOverlay = ({ prop }) => {
  return ReactDOM.createPortal(
    <div className={`${modalOverlayStyles["ModalOverlay"]}`}></div>,
    modalRoot
  );
};
