//UI
import modalOverlayStyles from "./modal-overlay.module.css";

//Types
import { FC } from "react";
import { ModalOverlayProps } from "./types";

export const ModalOverlay: FC<ModalOverlayProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${modalOverlayStyles.ModalOverlay}`}
    ></div>
  );
};
