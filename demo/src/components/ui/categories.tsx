import React from 'react';

const Categories = ({
  categories,
  filterItems,
  currentActive,
}: {
  categories: string[];
  filterItems: (category: string) => void;
  currentActive: number;
}) => {
  return (
    <div className='mb-16 flex justify-center'>
      {categories.map((category: string, i: number) => {
        return (
          <button
            key={i}
            type='button'
            className={`duration-[0.3s] mx-2 my-0 cursor-pointer rounded border-transparent px-3 py-1.5 text-base capitalize tracking-[1px] text-[#c59d5f] transition-all ease-linear hover:bg-[#c59d5f] hover:text-white ${
              categories.indexOf(category) === currentActive
                ? 'bg-[#c59d5f] text-white'
                : ''
            }`}
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
