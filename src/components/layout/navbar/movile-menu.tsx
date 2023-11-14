"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { withIcon } from "./menu";
import {
  GiAmpleDress,
  GiConverseShoe,
  GiGamepad,
  GiHouse,
  GiLipstick,
} from "react-icons/gi";

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

export const MovileMenu = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(true);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center "
      >
        <GiHamburgerMenu className="w-5 h-5" />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-gray-100 pb-6 ">
              <div className="flex items-center justify-end py-2 px-4">
                <button
                  className="flex h-11 w-11 items-center justify-center"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <AiOutlineClose className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                {categories.length ? (
                  <ul className="flex w-full flex-col">
                    {categories.map((item) => (
                      <li
                        className="py-2 text-xl text-black transition-colors hover:text-neutral-500 "
                        key={item.name}
                      >
                        <Link
                          className="group flex gap-5 w-full rounded-md"
                          href={item.name.toLowerCase()}
                          onClick={closeMobileMenu}
                        >
                          {item.icon({active: false})()}
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
};
