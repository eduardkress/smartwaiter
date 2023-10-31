import { MenuItem2 } from "@/types/menuItem2";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  item: MenuItem2;
};

const ItemModal = ({ item }: Props) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  return (
    <div key={item.id}>
      <div className="container mx-auto">
        <div
          className="container max-w-5xl flex flex-row justify-between bg-white p-4 gap-x-6 border rounded-lg border-gray-300 shadow cursor-pointer hover:bg-[#f5f5f5]"
          onClick={() => setOpen(true)}
        >
          <div className="flex flex-col gap-y-2">
            <h3 className="text-2xl font-bold">
              {item.title}
              <sup className="font-light text-sm pl-1">{item.allergens}</sup>
            </h3>
            <div className="font-normal text-base">{item.desc}</div>
            {item.prices.length > 1 ? (
              <div className="font-normal text-sm">
                Wahl aus:{" "}
                {item.prices.reduce(
                  (previousValue, currentValue, currentIndex) =>
                    previousValue +
                    (currentIndex === 0
                      ? currentValue.variation
                      : ", " + currentValue.variation),
                  ""
                )}
              </div>
            ) : (
              <Fragment />
            )}
            <div className="text-xl font-bold pt-3 grow flex flex-col-reverse">
              <div className="">
                {item.prices.length > 1
                  ? "ab " + item.prices[0].price + " €"
                  : item.prices[0].price + " €"}
              </div>
            </div>
          </div>
          {/*TODO: Bild beim Mobile vllt einfach weg? Man sieht iwie eh nicht viel dann lieber in dem Modal*/}
          <div className="relative shrink-0 w-20 h-20 sm:w-40 sm:h-40 border rounded-lg shadow">
            <div className="absolute inset-0">
              <Image
                className="rounded-lg"
                src={item.img}
                alt="Item1"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>
      {/*Modal*/}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                  <div className="container flex flex-col items-center space-y-2 bg-white pt-8">
                    <Dialog.Title
                      as="h2"
                      className="text-2xl font-bold leading-6 text-gray-900"
                    >
                      {item.title}
                      <sup className="font-light text-sm pl-1">
                        {item.allergens}
                      </sup>
                    </Dialog.Title>
                    {/*TODO: Evtl doch mit einem close button?*/}
                    {/*<div className="flex flex-row justify-between">*/}
                    {/*    <Dialog.Title as="h2" className="text-2xl font-bold leading-6 text-gray-900">*/}
                    {/*        Pizza Salami Deluxe<sup className="font-light text-sm pl-1">1,2,3</sup>*/}
                    {/*    </Dialog.Title>*/}
                    {/*    <div>*/}
                    {/*        close*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="flex sm:flex-row flex-col-reverse space-y-reverse space-y-2 sm:space-y-0 space-x-0 sm:space-x-2 justify-between overflow-auto items-center sm:items-stretch">
                      <div className="flex flex-col space-y-2 pb-3 items-center sm:items-stretch">
                        <div className="font-normal text-base">{item.desc}</div>
                        <div className="font-normal text-sm">
                          Zutaten: Teig, Dies das und so
                        </div>
                        <div className="text-lg font-bold pt-3">
                          {item.prices.length === 1 ? (
                            <Fragment>{item.prices[0].price} €</Fragment>
                          ) : (
                            <table className="table-auto border-spacing-x-2">
                              {item.prices.map((value, i) => {
                                return (
                                  <tr key={"variation" + i}>
                                    <th className="text-left pr-4">
                                      {value.variation}
                                    </th>
                                    <th className="text-right">
                                      {value.price} €
                                    </th>
                                  </tr>
                                );
                              })}
                            </table>
                          )}
                        </div>
                      </div>
                      <div className="relative w-40 h-40 border rounded-lg shadow shrink-0">
                        <div className="absolute inset-0">
                          <Image
                            className="rounded-lg"
                            src={item.img}
                            alt="Item1"
                            fill
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">*/}
                  {/*    <div className="sm:flex sm:items-start">*/}
                  {/*        /!*<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">*!/*/}
                  {/*        /!*    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />*!/*/}
                  {/*        /!*</div>*!/*/}
                  {/*        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">*/}
                  {/*            <Dialog.Title as="h2" className="text-2xl font-bold leading-6 text-gray-900">*/}
                  {/*                Pizza Salami Deluxe<sup className="font-light text-sm pl-1">1,2,3</sup>*/}
                  {/*            </Dialog.Title>*/}
                  {/*            <div className="mt-2">*/}
                  {/*                <div className="font-normal text-base">*/}
                  {/*                    mit 50% mehr Salami (OPTIONAL)*/}
                  {/*                </div>*/}
                  {/*                <div className="font-normal text-sm">*/}
                  {/*                    Wahl aus: 24cm, 28cm, 32cm, 38cm (OPTIONAL)*/}
                  {/*                </div>*/}
                  {/*                <div className="text-xl font-bold pt-3">*/}
                  {/*                    ab 9,90 €*/}
                  {/*                </div>*/}
                  {/*            </div>*/}
                  {/*        </div>*/}
                  {/*    </div>*/}
                  {/*</div>*/}

                  <div className="bg-[#f5f3f1] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Zurück
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default ItemModal;
