"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

type ModalProps = {
  children: React.ReactNode;
  close: () => void;
};

function Modal({ children, close }: ModalProps) {
  const modalBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickListener = (e: Event) => {
      if (modalBgRef.current === e.target) {
        close();
      }
    };
    document.addEventListener("click", clickListener);
    return () => {
      document.removeEventListener("click", clickListener);
    };
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen z-100 bg-gray-300/80 dark:bg-gray-800/80 backdrop-blur-sm"
      ref={modalBgRef}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        className="bg-gray-200 dark:bg-gray-900 w-100 rounded-lg pt-5 pb-10 flex flex-col gap-y-5 px-10"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default Modal;
