import { Category, Menu } from "@/types/restaurant";
import Offer from "../icons/Offer";

interface Props {
  category: Category;
  menu: Menu;
}

const getDayOfWeekName = (dayNumber: number): string => {
  switch (dayNumber) {
    case 1:
      return "Montag";
    case 2:
      return "Dienstag";
    case 3:
      return "Mittwoch";
    case 4:
      return "Donnerstag";
    case 5:
      return "Freitag";
    case 6:
      return "Samstag";
    case 7:
      return "Sonntag";
    default:
      return "";
  }
};

const getFormattedTimeByNumber = (timeNumber: number): string => {
  let hours = Math.floor(timeNumber / 100).toString();
  if (hours.length === 1) {
    hours = "0" + hours;
  }
  let minutes = (timeNumber % 100).toString();
  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
};

function MenuCategoryDiscounts({ category, menu }: Props) {
  return (
    category.discountId &&
    category.discountId.length > 0 && (
      <div className="px-2 xl:px-0 mt-5 flex max-w-5xl flex-col justify-between gap-y-1">
        {category.discountId.map((value, index) => {
          const discount = menu.discounts!.find((val) => val.id === value)!;
          return (
            <div className="flex items-center gap-x-3">
              <div className="w-12 h-12 fill-orange-400">
                <Offer />
              </div>
              <div key={index} className="flex flex-col">
                {/* <div className="text-base font-bold sm:text-lg">
                {discount.name}
              </div> */}
                <div className="text-base font-bold">
                  Angebot: {discount.description}
                </div>
                <div className="text-base">
                  Gültig von {getDayOfWeekName(discount.daysOfWeek[0])} -{" "}
                  {getDayOfWeekName(
                    discount.daysOfWeek[discount.daysOfWeek.length - 1]
                  )}{" "}
                  von {getFormattedTimeByNumber(discount.from)} -{" "}
                  {getFormattedTimeByNumber(discount.until)} Uhr.
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
  );
}

export default MenuCategoryDiscounts;
