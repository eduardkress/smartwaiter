import React from "react";
import Image from "next/image";
import { MenuItem } from "@/types/menuItem";

const Menu = ({ items }: { items: MenuItem[] }) => {
  return (
    <div className="w-[90vw] max-w-[1170px] grid gap-[3rem_2rem] justify-items-center mx-auto my-0 lg:w-[95vw] lg:grid-cols-[1fr_1fr]">
      {items.map((menuItem) => {
        const { id, title, img, price, desc, allergens } = menuItem;

        return (
          <article key={id} className="grid gap-[1rem_2rem] max-w-[25rem] md:grid-cols-[225px_1fr] md:gap-[0_1.25rem] md:max-w-screen-sm">
            <Image
              src={img}
              alt={title}
              width={200}
              height={80}
              className="object-cover h-[200px] w-full rounded-[var(--radius)] block border-4 border-solid border-[#c59d5f]"
            />
            <div>
              <header className="flex justify-between border-b-[0.5px] border-b-[hsl(210,22%,49%)] border-dotted">
                <h4 className="mb-2 text-sm font-bold tracking-[0.1rem] capitalize leading-tight">{title} {allergens?<sup className="font-light">{allergens}</sup>:""}</h4>
                <h4 className="mb-2 text-sm font-bold tracking-[0.1rem] capitalize leading-tight text-[#c59d5f]">${price}</h4>
              </header>
              <p className="text-[hsl(210,22%,49%)] mb-5 pt-4">{desc}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export { Menu };
