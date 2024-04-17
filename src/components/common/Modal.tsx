import { Icon } from "@iconify/react/dist/iconify.js";
import React, { ReactNode, useRef } from "react";
import Modal from "react-modal";

export const customStyles: Modal.Styles = {
  content: {
    width: "80%", // Base width for all screens
    maxWidth: "600px", // Max width for larger screens
    margin: "auto",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    background: "none",
    border: "none",
    transform: "translate(-50%, -50%)",
    // overflow:'auto',
    overflowY: "auto",
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
