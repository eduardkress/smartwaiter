import React from "react";

const Categories = ({
  categories,
  filterItems,
  currentActive,
}: {
  categories: string[];
  filterItems: Function;
  currentActive: number;
}) => {
  return (
    <div className="flex justify-center mb-16">
      {categories.map((category: string, i: number) => {
        return (
          <button
            key={i}
            type="button"
            className={`text-base capitalize tracking-[1px] text-[#c59d5f] cursor-pointer transition-all duration-[0.3s] ease-linear rounded mx-2 my-0 px-3 py-1.5 border-transparent hover:text-white hover:bg-[#c59d5f] ${categories.indexOf(category) === currentActive ? "text-white bg-[#c59d5f]" :"" }`}
            onClick={() => filterItems(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export { Categories };
