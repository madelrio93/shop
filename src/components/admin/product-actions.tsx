"use client";

import { useTranslations } from "@/lib/hooks/useTranslations";
import { removeStorageImages, saveStorageImages } from "@/lib/storage";
import { ProductFormValuesType, ProductType } from "@/type";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AiFillDelete } from "react-icons/ai";
import { ProductFormModal } from "./product-form-modal";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";

export const AddProduct = () => {
  const { translate } = useTranslations();
  const supabase = createClientComponentClient();

  const handleOnSave =
    (newImages: (string | File)[] | null) =>
    async (newProduct: ProductFormValuesType) => {
      if (newImages && newImages.length > 0) {
        const images = await saveStorageImages({
          images: newImages as File[],
          db: supabase,
          bucket: "products-images",
          folder: newProduct.category,
        });

        if (images.length > 0) {
          const res = await supabase
            .from("products")
            .insert<Partial<ProductType>>({
              title: newProduct.title,
              description: newProduct.description,
              category: newProduct.category,
              images: images,
              price: newProduct.price,
            })
            .select("*");

          return res.data;
        }
      }
    };

  return (
    <ProductFormModal
      buttonText={translate.buttons.new}
      caption={translate.dialog.addProduct}
      defaultValues={{
        title: "",
        category: "",
        description: "",
        images: [],
        price: 0,
      }}
      onSave={handleOnSave}
    />
  );
};

export const EditProduct = ({ product }: { product: ProductType }) => {
  const { translate } = useTranslations();
  const supabase = createClientComponentClient();

  const handleOnSave =
    (
      newImages: (string | File)[] | null,
      removedImages: string[] | undefined
    ) =>
    async (newProduct: ProductFormValuesType) => {
      const uploadImages = newImages
        ? (newImages as File[]).filter(
            (img) => !product.images.includes(img?.name)
          )
        : [];
      await Promise.all([
        removedImages && removedImages?.length > 0
          ? await removeStorageImages({
              images: removedImages,
              db: supabase,
              bucket: "products-images",
              folder: newProduct.category,
            })
          : [],
        uploadImages && uploadImages.length > 0
          ? await saveStorageImages({
              images: uploadImages,
              db: supabase,
              bucket: "products-images",
              folder: newProduct.category,
            })
          : [],
      ]);

      const images = product.images
        .filter((img) => (removedImages ? !removedImages.includes(img) : true))
        .concat(uploadImages.map((upload) => upload.name));

      const res = await supabase
        .from("products")
        .update<Partial<ProductType>>({
          title: newProduct.title,
          description: newProduct.description,
          category: newProduct.category,
          images: images,
          price: newProduct.price,
        })
        .eq("id", product.id)
        .select("*");

      return res.data;
    };

  return (
    <ProductFormModal
      buttonText={<FaEdit className="w-4 h-4" />}
      caption={translate.dialog.editProduct}
      defaultValues={{
        title: product.title,
        category: product.category,
        description: product.description,
        images: product.images,
        price: product.price,
      }}
      onSave={handleOnSave}
    />
  );
};

export const DeleteProduct = ({
  id,
  images,
  category,
}: {
  id: number;
  images: string[];
  category: string;
}) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const supabase = createClientComponentClient();

  const handleDeleteProduct = async () => {
    setIsDeleting(true);

    const [response] = await Promise.all([
      await supabase.from("products").delete().eq("id", id).select(),
      await removeStorageImages({
        images: images,
        db: supabase,
        bucket: "products-images",
        folder: category,
      }),
    ]);

    if (response.data) {
      router.refresh();
      setIsDeleting(false);
    }
  };

  if (isDeleting) {
    return (
      <Spinner className="w-4 h-4 text-[var(--primary-color-dark)] animate-spin-fast fill-white ml-2" />
    );
  }

  return (
    <button
      className="text-gray-700 hover:bg-gray-200 hover:text-[--primary-color-main] p-2 rounded-full"
      onClick={handleDeleteProduct}
    >
      <AiFillDelete className="w-4 h-4" />
    </button>
  );
};
