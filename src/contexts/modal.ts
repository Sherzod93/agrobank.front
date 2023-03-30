import { createContext, useContext } from 'react';

type ModalContextType = {
  closeModal: () => void;
  isModalShown: boolean;
  isFocusedElement: boolean;
  openModal: () => void;
  setIsFocusedElement: (value: boolean) => void;
};

export const ModalContext = createContext<ModalContextType>({} as ModalContextType);

export const useModalContext = () => {
  return useContext(ModalContext);
};
