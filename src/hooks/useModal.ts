import { useState } from "react";

type Modal = {
  create: boolean;
  edit: boolean;
  delete: boolean;
  detail: boolean;
  related: boolean;
};

export const useModal = (): [
  Modal,
  (name: keyof Modal, value: boolean) => void
] => {
  const [modal, setModal] = useState<Modal>({
    create: false,
    edit: false,
    delete: false,
    detail: false,
    related: false,
  });

  const handleModal = (name: keyof Modal, value: boolean) => {
    setModal({ ...modal, [name]: value });
  };

  return [modal, handleModal];
};
