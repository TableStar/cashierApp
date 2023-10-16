import React from 'react'
import { useState } from "react";

useState

const useToggle = () => {
  const [isOpenModal, setIsOpenModal] = useState();

  const onToggleOpen = () => {
    setIsOpenModal(true);
  };
  const onToggleClose = () => {
    setIsOpenModal(false);
  };
  return { isOpenModal, onToggleOpen, onToggleClose };
};

export default useToggle