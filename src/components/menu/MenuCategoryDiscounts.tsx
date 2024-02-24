import { Category, Menu } from "@/types/restaurant";

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
      <div className="container flex max-w-5xl flex-col justify-between gap-y-3 rounded-lg border border-gray-300 bg-white p-4 shadow">
        {category.discountId.map((value, index) => {
          const discount = menu.discounts!.find((val) => val.id === value)!;
          return (
            <div key={index}>
              <div className="text-base font-bold sm:text-xl">
                {discount.name}
              </div>
              <div className="text-sm">
                Gültig von {getDayOfWeekName(discount.daysOfWeek[0])} -{" "}
                {getDayOfWeekName(
                  discount.daysOfWeek[discount.daysOfWeek.length - 1],
                )}{" "}
                von {getFormattedTimeByNumber(discount.from)} -{" "}
                {getFormattedTimeByNumber(discount.until)} Uhr.
              </div>
              <div>{discount.description}</div>
            </div>
          );
        })}
      </div>
    )
  );
}

export default MenuCategoryDiscounts;
