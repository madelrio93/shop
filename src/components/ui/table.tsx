import { ReactNode } from "react";

export type ColumnType<T> = {
  id: keyof T;
  label: string;
  type?: ValuesType;
  render?: ({}: {
    value: ReactNode;
    row: T;
    column: Exclude<ColumnType<T>, "render">;
  }) => ReactNode;
};

export type DataRow = {
  [key: string]: CellValueType;
};

export type ValuesType = "text" | "number" | "boolean" | "date" | "array";

export type CellValueType = string | number | boolean | Date | string[];

export type ActionsType<T> = {
  label?: string;
  render: (row: T) => ReactNode;
};

export const CellValue = ({
  value,
  type = "text",
}: {
  value: CellValueType;
  type?: ValuesType;
}) => {
  const render = {
    date: new Date(value as Date).toLocaleString(),
    boolean: value ? "yes" : "no",
    arry: JSON.stringify(value)
  };
  
  return render[type as keyof typeof render] ?? value;
};
