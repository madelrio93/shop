import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export type StorageFileType<ImageType> = {
  images: ImageType;
  db: SupabaseClient<any, "public", any>;
  bucket: string;
  folder: string;
};

export const saveStorageImages = async ({
  images,
  db,
  bucket,
  folder,
}: StorageFileType<File[]>): Promise<string[]> => {
  const imgs: string[] = [];

  await Promise.all(
    images.map(async (img: File) => {
      const { error } = await db.storage
        .from(bucket)
        .upload(`${folder}/${img.name}`, img);

      if (error) {
        console.log(error);
      } else {
        imgs.push(img.name);
      }
    })
  );
  return [images[0]?.name, ...imgs.filter((name) => name !== images[0]?.name)];
};

export const removeStorageImages = async ({
  images,
  db,
  bucket,
  folder,
}: StorageFileType<string[]>) => {
  const imgs: string[] = [];

  const { data, error } = await db.storage
    .from(bucket)
    .remove(images.map((img) => `${folder}/${img}`));

  if (error) {
    console.log(error);
  } else {
    return data.map((d) => d.name.split(`${folder}/`)[1]);
  }
};
