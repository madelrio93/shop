"use client";

import { Popover, Transition } from "@headlessui/react";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, DOMAttributes, Fragment, useEffect, useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";

const categoriesPath = [
  {
    label: "Ropa",
    category: "ropa",
  },
  {
    label: "Zapatos",
    category: "zapatos",
  },
  {
    label: "Maquillajes - Facial",
    category: "maquillajes",
  },
  {
    label: "Hogar",
    category: "hogar",
  },
  {
    label: "Otros",
    category: "otros",
  },
];

export const FilterButton = ({ text, position }: { text: string, position: 'left' | 'right'}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (selected.length === categoriesPath.length || selected.length === 0) {
      router.push(`${pathname}`);
    } else {
      router.push(`${pathname}?category=${[selected]}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleChecked = (category: string) => () => {
    const isChecked = selected.includes(category);

    setSelected(
      isChecked ? selected.filter((v) => v !== category) : [...selected, category]
    );
  };

  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button className="bg-white focus:border-none flex gap-1 items-center px-3 py-1.5 rounded text-xs md:text-sm font-semibold">
            {text}
            <BiSortAlt2 className="text-[var(--primary-color-main)] w-5 h-5" />
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
                {categoriesPath.map((c) => (
                  <div className="py-1 mb-2 px-2 rounded flex items-center cursor-pointer hover:bg-[#e0e0e0]" key={c.category} onClick={handleChecked(c.category)}>
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      name={c.category}
                      defaultChecked={selected.includes(c.category)}    
                      className="w-3 h-3 rounded cursor-pointer accent-[var(--primary-color-light)]"
                    />
                    <label
                      htmlFor="default-checkbox"
                      className="ms-2 text-sm font-medium text-zinc-600"
                    >
                      {c.label}
                    </label>
                  </div>
                ))}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}

      {/**<input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-checkbox"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Default checkbox
                    </label> */}
      {/* <Menu as="div" className="relative right-0 inline-block text-left z-10 ">
        <div>
          <Menu.Button className="bg-white py-1 px-2 flex gap-1 items-center text-xs md:text-sm shadow-sm">
           
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-right absolute w-56 bg-[#c7c7c7] rounded-md shadow-lg">
            <div className="px-1 py-1 ">
              {categoriesPath.map((item) => (
                <Menu.Item key={item.label}>
                  {({ active }) => (
                    <div className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-normal">
                      <div className="flex items-center mb-4">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          value=""
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-checkbox"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Default checkbox
                        </label>
                      </div>
                    </div>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu> */}
    </Popover>
  );
};
