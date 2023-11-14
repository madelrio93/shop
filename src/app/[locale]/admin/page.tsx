import { FilterButton } from "@/components/common/filter-button";
import { AddProduct } from "@/components/admin/product-actions";
import { ProductsRows } from "@/components/admin/products-rows";
import { Spinner } from "@/components/ui/spinner";
import type { ColumnType } from "@/components/ui/table";
import { getTranslation } from "@/i18nConfig";
import { ProductType } from "@/type";
import { Suspense } from "react";

const AdminPage = async ({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { category: string };
}) => {
  const translate = await getTranslation(locale);
  const columns: ColumnType<ProductType>[] = [
    {
      id: "created_at",
      label: "Fecha",
      type: "date",
    },
    {
      id: "title",
      label: translate.product.title,
    },
    {
      id: "description",
      label: translate.product.description,
    },
    {
      id: "price",
      label: translate.product.price,
    },
    {
      id: "category",
      label: translate.product.category,
    },
  ];

  return (
    <div className="container pt-5 h-full">
      <div className="h-full bg-white">
        <div className="flex items-center py-2 px-1">
          <div className="flex-grow">
            <div className="flex gap-1 pl-2">
              <FilterButton text={translate.buttons.filter} position="left"/>
            </div>
          </div>
          <AddProduct />
        </div>
        <div className="relative overflow-x-auto overflow-y-auto h-full">
          <table className="w-full text-sm text-left text-gray-500 table table-auto">
            <thead className="text-xs text-gray-500 uppercase  dark:bg-gray-700 dark:text-gray-400">
              <tr className="table-row">
                {columns.map((column) => (
                  <th
                    key={column.id as string}
                    className="bg-white text-zinc-600 !rounded-none px-6 py-4 font-bold table-cell"
                  >
                    {column.label}
                  </th>
                ))}
                <th className="bg-white text-zinc-600 !rounded-none px-6 py-4 font-bold">
                  {"Acción"}
                </th>
              </tr>
            </thead>
            <tbody>
              <Suspense
                fallback={
                  <tr className="absolute left-0 right-0 bottom-0 top-0 flex items-center justify-center">
                    <td>
                      <Spinner className="w-8 h-8 text-[var(--primary-color-dark)] animate-spin-fast fill-white ml-2" />
                    </td>
                  </tr>
                }
              >
                <ProductsRows
                  locale={locale}
                  columns={columns}
                  category={searchParams.category}
                />
              </Suspense>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
