import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "../modal/modal";
import { SingleOrderModal } from "./single-order-modal";

export const SingleOrderModalWrapper = () => {
  let navigate = useNavigate();
  const closePopup = (): void => {
    navigate(-1);
  };

  const { number } = useParams();
  return (
    <Modal modalTitle={`#${number}`} closePopup={closePopup}>
      <SingleOrderModal />
    </Modal>
  );
};
