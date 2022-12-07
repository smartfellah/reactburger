import modalOverlayStyles from "./modal-overlay.module.css";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
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
ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
