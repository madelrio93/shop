import { Locale, getTranslation } from "@/i18nConfig";
import { ProductType } from "@/type";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { CellValue, type ColumnType } from "../ui/table";
import { DeleteProduct, EditProduct } from "./product-actions";

export const ProductsRows = async ({
  locale,
  columns,
  category,
}: {
  locale: Locale;
  columns: ColumnType<ProductType>[];
  category?: string;
}) => {
  const translate = await getTranslation(locale);
  const supabase = createServerComponentClient({ cookies });
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .in(...[!category ? "" : "category", !category ? [] : category.split(",")]);

  return (
    <>
      {products && products.length > 0 ? (
        (products as ProductType[]).map((row, i) => (
          <tr
            key={`${i}`}
            className="border-b border-gray-300 bg-transparent hover:bg-gray-100"
          >
            <>
              {Object.entries(row).map((_, idx) => {
                return (
                  !!columns[idx] && (
                    <td
                      key={row[columns[idx]?.id as keyof typeof row] as string}
                      className="whitespace-nowrap text-zinc-500 font-semibold text-sm text-ellipsis px-6 py-4 max-w-xs table-cell overflow-hidden"
                    >
                      {columns[idx]?.render?.({
                        value: (row as any)[columns[idx]?.id],
                        row: row,
                        column: columns[idx],
                      }) ?? (
                        <CellValue
                          type={columns[idx]?.type}
                          value={row[columns[idx]?.id as keyof ProductType]}
                        />
                      )}
                    </td>
                  )
                );
              })}
              <td className="whitespace-nowrap font-medium !rounded-none px-6 py-4">
                <div className="flex items-center gap-1">
                  {row.id && (
                    <>
                      <EditProduct product={{ ...row }} />
                      <DeleteProduct
                        id={row.id}
                        images={row.images}
                        category={row.category}
                      />
                    </>
                  )}
                </div>
              </td>
            </>
          </tr>
        ))
      ) : (
        <tr className="absolute left-0 right-0 bottom-14 top-0 flex items-center justify-center">
          <td className="text-xl">{translate.message.noData}</td>
        </tr>
      )}
    </>
  );
};
