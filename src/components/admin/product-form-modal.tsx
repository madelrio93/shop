"use client";

import { ProductFormValuesType } from "@/type";
import { useState } from "react";
import { Modal } from "../ui/modal";
import { ProductForm } from "./product-form";

export const ProductFormModal = ({
  caption,
  defaultValues: values,
  buttonText,
  onSave,
}: {
  caption: string;
  defaultValues: ProductFormValuesType;
  buttonText: string | JSX.Element;
  onSave: (
    newImages: (File | string)[] | null,
    removedImages?: string[]
  ) => (newProduct: ProductFormValuesType) => Promise<any>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonStyle =
    typeof buttonText === "string"
      ? "bg-[var(--primary-color-main)] hover:bg-[var(--primary-color-dark)] text-white font-semibold px-3 py-1.5 rounded text-xs md:text-sm"
      : "text-gray-700 hover:bg-gray-200 hover:text-[--primary-color-main] p-2 rounded-full";

  function onClose() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button className={buttonStyle} onClick={openModal}>
        {buttonText}
      </button>

      {isOpen && (
        <Modal open={isOpen} caption={caption} onClose={onClose}>
          <ProductForm {...{ values, onSave, onClose }} />
        </Modal>
      )}
    </>
  );
};
