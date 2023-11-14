"use client";

import { useTranslations } from "@/lib/hooks/useTranslations";
import { removeStorageImages, saveStorageImages } from "@/lib/storage";
import { getImageURL } from "@/lib/utils";
import { ProductFormValuesType, ProductType } from "@/type";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { IoCloudUploadOutline } from "react-icons/io5";
import { Spinner } from "../ui/spinner";

export const ProductForm = ({
  values,
  onSave,
  onClose,
}: {
  values: ProductFormValuesType;
  onSave: (
    newImages: (File | string)[] | null,
    removedImages?: string[]
  ) => (newProduct: ProductFormValuesType) => Promise<any[]>;
  onClose: () => void;
}) => {
  const { translate } = useTranslations();
  const [removeImages, setRemoveImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<(File | string)[] | null>(
    values.images
  );
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValuesType>({
    defaultValues: values,
  });

  const handleSelectImage = ({
    target: { files },
  }: ChangeEvent<HTMLInputElement>) => {
    if (files && files?.length !== 0) {
      setSelectedImage([...(selectedImage ?? []), ...Array.from(files)]);
    }
  };

  const handleRemoveImage =
    (imageId: number | string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (typeof imageId === "string") {
        setRemoveImages([...removeImages, imageId]);
      }

      setSelectedImage(
        selectedImage?.filter((img) =>
          typeof img === "string"
            ? img !== imageId
            : img.lastModified !== imageId
        ) ?? null
      );
    };

  const saveProductValues = async (newProduct: ProductFormValuesType) => {
    const res = await onSave(
      selectedImage
        ? selectedImage?.filter((img) => typeof img !== "string")
        : [],
      removeImages
    )(newProduct);

    if (res && res.length > 0) {
      router.refresh();
      onClose();
      return res;
    }
  };

  return (
    <form className="mt-2" onSubmit={handleSubmit(saveProductValues)}>
      <label htmlFor="icon_upload">
        <div className="mt-5 border border-gray-300 rounded flex items-center justify-center py-5 md:py-10 cursor-pointer h-full">
          {selectedImage && selectedImage?.length > 0 ? (
            <div className="grid grid-cols-4 gap-1 px-2 overflow-hidden h-fit">
              {selectedImage?.map((img) => (
                <div
                  key={typeof img === "string" ? img : img.lastModified}
                  className="relative group"
                >
                  <Image
                    className="w-full h-16 md:h-24 object-cover"
                    alt="not found"
                    width={80}
                    height={80}
                    src={
                      typeof img === "string"
                        ? getImageURL(img, values.category)
                        : URL.createObjectURL(img)
                    }
                  />

                  <button
                    className="absolute hidden bg-black/70 top-0 right-0 bottom-0 left-0 group-hover:flex items-center justify-center transition-all"
                    onClick={handleRemoveImage(
                      typeof img === "string" ? img : img.lastModified
                    )}
                  >
                    <AiOutlineClose className="w-8 h-8 bg-[var(--primary-color-main)] p-2 rounded-full text-white" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <IoCloudUploadOutline className="w-12 h-12 text-gray-300" />
          )}
        </div>
      </label>

      <input
        id="icon_upload"
        className="hidden"
        multiple
        type="file"
        onChange={handleSelectImage}
      />

      <input
        type="text"
        className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mt-5"
        placeholder={translate.product.title}
        {...register("title", {
          required: translate.error.required.replace(
            "{field}",
            translate.product.title
          ),
        })}
      />
      {errors.title && (
        <p className="text-sm mt-1 text-red-500">{errors.title.message}</p>
      )}

      <textarea
        rows={2}
        className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mt-5"
        placeholder={translate.product.description}
        {...register("description", {
          required: translate.error.required.replace(
            "{field}",
            translate.product.description
          ),
        })}
      />
      {errors.description && (
        <p className="text-sm mt-1 text-red-500">
          {errors.description.message}
        </p>
      )}

      <input
        type="number"
        className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mt-5"
        placeholder={translate.product.price}
        {...register("price", {
          required: translate.error.required.replace(
            "{field}",
            translate.product.price
          ),
        })}
      />
      {errors.price && (
        <p className="text-sm mt-1 text-red-500">{errors.price.message}</p>
      )}

      <select
        className="border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 mt-5"
        placeholder={translate.product.category}
        {...register("category", {
          required: translate.error.required.replace(
            "{field}",
            translate.product.category
          ),
        })}
      >
        <option value="ropa">Ropa</option>
        <option value="zapatos">Zapatos</option>
        <option value="maquillajes">Maquillajes</option>
        <option value="hogar">Hogar</option>
        <option value="otros">Otros</option>
      </select>
      {errors.category && (
        <p className="text-sm mt-1 text-red-500">{errors.category.message}</p>
      )}

      <button
        className="mt-7 bg-[var(--primary-color-main)] hover:bg-[var(--primary-color-dark)] text-white px-4 py-2 rounded text-xs md:text-sm disabled:bg-[var(--disabled-color)] flex items-center gap-2"
        type="submit"
        disabled={isSubmitting}
      >
        {translate.buttons.done}
        {isSubmitting && (
          <Spinner className="w-4 h-4 text-white animate-spin fill-[var(--primary-color-dark)]" />
        )}
      </button>
    </form>
  );
};
