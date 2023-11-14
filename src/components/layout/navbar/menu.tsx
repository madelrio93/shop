"use client";

import { Transition, Menu as UiMenu } from "@headlessui/react";
import Link from "next/link";
import { ComponentType, Fragment } from "react";
import { BiChevronDown } from "react-icons/bi";
import {
  GiAmpleDress,
  GiConverseShoe,
  GiGamepad,
  GiHouse,
  GiLipstick,
} from "react-icons/gi";
import { usePathname } from "next/navigation";

export const withIcon =
  (Component: ComponentType<any>) =>
  ({ active }: { active: boolean }) => {
    const Icon = () => (
      <Component
        className={`${
          active ? "text-white" : "text-[--primary-color-main]"
        } text-xl`}
      />
    );

    Icon.displayName = `withIssueFormModalButton(${
      Component.displayName || Component.name
    })`;

    return Icon;
  };

const categories = [
  {
    name: "Ropa",
    icon: withIcon(GiAmpleDress),
  },
  {
    name: "Zapatos",
    icon: withIcon(GiConverseShoe),
  },
  {
    name: "Maquillajes - Facial",
    icon: withIcon(GiLipstick),
  },
  {
    name: "Hogar",
    icon: withIcon(GiHouse),
  },
  {
    name: "Otros",
    icon: withIcon(GiGamepad),
  },
];

export const Menu = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-5 w-full items-center">
      <Link
        href={"/"}
        className={`inline-flex w-full justify-center text-md font-medium ${
          pathname === "/" ? "text-black" : "text-zinc-500"
        } hover:text-zinc-950`}
      >
        Inicio
      </Link>
      <UiMenu as="div" className="relative z-50 inline-block text-left">
        <div>
          <UiMenu.Button className="inline-flex items-center w-full justify-center text-md font-medium text-zinc-500 hover:text-zinc-950">
            Categorias
            <BiChevronDown className="h-5 w-5" aria-hidden="true" />
          </UiMenu.Button>
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
          <UiMenu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              {categories.map((category) => (
                <UiMenu.Item key={category.name}>
                  {({ active }) => (
                    <Link
                      href={`/${category.name.toLowerCase()}`}
                      className={`${
                        active ? "bg-[#f505af] text-white" : "text-zinc-500"
                      } group flex gap-5 w-full rounded-md px-2 py-2 text-sm text-md font-medium`}
                    >
                      {category.icon({ active })()}
                      {category.name}
                    </Link>
                  )}
                </UiMenu.Item>
              ))}
            </div>
          </UiMenu.Items>
        </Transition>
      </UiMenu>
      <Link
        href={"/about"}
        className={`inline-flex w-full justify-center text-md font-medium ${
          pathname === "/about" ? "text-black" : "text-zinc-500"
        } `}
      >
        Nosotros
      </Link>
    </div>
  );
};
