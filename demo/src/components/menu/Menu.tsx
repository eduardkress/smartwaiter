import MenuItem from '@/components/menu/MenuItem';
import Hero from '@/components/menu/Hero';
import { Menu } from '@/types/restaurant2';
import { Fragment } from 'react';

interface Props {
  menu: Menu;
}

const getDayOfWeekName = (dayNumber: number) : string => {
  switch (dayNumber) {
    case 1: return "Montag";
    case 2: return "Dienstag";
    case 3: return "Mittwoch";
    case 4: return "Donnerstag";
    case 5: return "Freitag";
    case 6: return "Samstag";
    case 7: return "Sonntag";
    default: return "";
  }
};

const getFormattedTimeByNumber = (timeNumber: number) : string => {
  let hours = Math.floor(timeNumber/100).toString();
  if (hours.length === 1) {
    hours = "0" + hours;
  }
  let minutes = (timeNumber % 100).toString();
  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }
  return hours+":"+minutes;
};

function Menu({ menu }: Props) {
  return (
    <div className='bg-gray-50 py-10'>
      <div className='flex flex-col space-y-10'>
        {menu.categories.map((category) => {
          return (
            <div key={category.id} id={'category' + category.id}>
              <div className='container mx-auto flex flex-col space-y-2 py-4'>
                {category.imageUrl && (
                  <div className='container mx-auto max-w-5xl px-0 pb-2'>
                    <Hero
                      imgSrc={category.imageUrl}
                      heroAlt={category.name}
                      tailwindClasses={'h-44 rounded-xl overflow-hidden'}
                    />
                  </div>
                )}
                <h2 className='container mx-auto max-w-5xl px-0 text-2xl font-bold'>{category.name}</h2>
                {(category.description && category.description.length > 0) && (
                  <div className='container mx-auto max-w-5xl px-0 text-sm font-sans'>
                    {category.description.map((description, index) => index === category.description!.length-1 ? <Fragment key={index}>description</Fragment> : <Fragment key={index}>{description}<br/></Fragment>)}
                  </div>
                )}
                {(category.discountId && category.discountId.length > 0) && (
                  <div className='container flex max-w-5xl flex-col justify-between gap-y-3 rounded-lg border border-gray-300 bg-white p-4 shadow'>
                    {category.discountId.map((value, index) => {
                      const discount = menu.discounts!.find(val => val.id === value)!;
                      return (
                        <div key={index}>
                          <div className="text-base font-bold sm:text-xl">
                            {discount.name}
                          </div>
                          <div className="text-sm">
                            Gültig von {getDayOfWeekName(discount.daysOfWeek[0])} - {getDayOfWeekName(discount.daysOfWeek[discount.daysOfWeek.length-1])} von {getFormattedTimeByNumber(discount.from)} - {getFormattedTimeByNumber(discount.until)} Uhr.
                          </div>
                          <div>
                            {discount.description}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
              <div className='flex flex-col space-y-5'>
                {category.productIds.map((productId, index) => {
                  const product = menu.products.find((value) => value.id === productId);
                  console.assert(product, `ProductId ${productId} not found.`);
                  return product && <MenuItem key={index} menu={menu} product={product} />;
                })}
              </div>
              <div className='categoryAnchor mx-auto' />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
