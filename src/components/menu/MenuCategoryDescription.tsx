import { Category } from "@/types/restaurant";
import { Fragment } from "react";

interface Props {
  category: Category;
}

function MenuCategoryDescription({ category }: Props) {
  return (
    category.description &&
    category.description.length > 0 && (
      <div className="max-w-5xl px-2 xl:px-0 text-base">
        {category.description
          .map((description, index) => (
            <Fragment key={index}>{description}</Fragment>
          ))
          .reduce((previousValue, currentValue) => {
            return (
              <Fragment>
                {previousValue}
                <br />
                {currentValue}
              </Fragment>
            );
          })}
      </div>
    )
  );
}

export default MenuCategoryDescription;
