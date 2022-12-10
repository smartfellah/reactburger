import modalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";
export const ModalOverlay = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${modalOverlayStyles["ModalOverlay"]}`}
    ></div>
  );
};
ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};
