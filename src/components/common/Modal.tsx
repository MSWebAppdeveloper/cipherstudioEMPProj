
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { ReactNode, useRef } from "react";
import Modal from "react-modal";

export const customStyles: Modal.Styles = {
  content: {
    margin: "auto",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    background: "none",
    width: "80%", // Base width for all screens
    maxWidth: "600px", // Max width for larger screens
    border: "none",
    transform: "translate(-50%, -50%)",
    overflow: "auto",
    overflowY: "auto",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.6)", // Adjust opacity here (0.6 in this example)
    zIndex: "1",
  },
};


interface UseModalProps {
  children: ReactNode;
  isOpen: any;
  closeModal: any;
}

export const UseModal: React.FC<UseModalProps> = ({
  isOpen,
  closeModal,
  children,
}) => {
  const subtitle = useRef<HTMLHeadingElement | null>(null);
  const afterOpenModal = () => {
    if (subtitle.current) {
      subtitle.current.style.color = "#f00";
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
};
