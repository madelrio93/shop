"use client";

import { categories } from "@/config";
import { Popover, Transition } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from "react";
import { MdFilterAlt } from "react-icons/md";

export const FilterButton = ({
  text,
  position,
}: {
  text: string;
  position: "left" | "right";
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState<string[]>([]);

  const handleOnChecked = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = target;

    const newValues = !checked
      ? selected.filter((v) => v !== name)
      : [...selected, name];

    setSelected(newValues);
  };

  const filterData = () => {
    if (selected.length === categories.length || selected.length === 0) {
      router.push(`${pathname}`);
    } else {
      router.push(`${pathname}?category=${[selected]}`);
      router.refresh();
    }
  };

  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <Popover.Button className="bg-[var(--bg-main)] focus:border-none flex gap-1 items-center px-3 py-1.5 rounded text-xs md:text-sm font-primary shadow-md">
            {text}
            <MdFilterAlt className="text-[var(--primary-color-main)] w-4 h-4" />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className={`absolute z-10 ${position}-0`}>
              <div className="overflow-hidden rounded-lg shadow-lg bg-[#ebebeb] w-60 px-1 pt-2">
                <form
                  className="pb-3"
                  onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    filterData();
                    close();
                  }}
                >
                  {categories.map((c) => (
                    <div
                      className="py-1 mb-2 px-2 rounded flex items-center cursor-pointer hover:bg-[#e0e0e0]"
                      key={c.path}
                    >
                      <input
                        className="w-3 h-3 rounded cursor-pointer accent-[var(--primary-color-light)]"
                        id="default-checkbox"
                        type="checkbox"
                        name={c.path}
                        onChange={handleOnChecked}
                        checked={selected.includes(c.path)}
                      />
                      <label
                        htmlFor="default-checkbox"
                        className="ms-2 text-sm font-primary font-medium text-zinc-600"
                      >
                        {c.name}
                      </label>
                    </div>
                  ))}
                  <div className="text-center font-primary">
                    <button className="" type="submit">
                      Aplicar
                    </button>
                  </div>
                </form>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
