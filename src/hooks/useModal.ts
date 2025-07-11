import { useEffect, useState } from "react";

export const useModal = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = `hidden`;
    } else document.body.style.overflow = ``;
  }, [isActive]);

  const showModal = () => setIsActive(true);

  const closeModal = () => setIsActive(false);

  return { isActive, showModal, closeModal };
};
