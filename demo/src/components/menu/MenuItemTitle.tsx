import * as React from 'react';
import { Fragment, useEffect } from 'react';
import { Button, Tooltip } from '@nextui-org/react';
import Info from '@/components/icons/Info';
import { CategoryItem } from '@/types/categoryItem';
import { allergens } from '@/components/ui/allergen';

type Props = {
  item: CategoryItem;
};

function MenuItemTitle({ item }: Props) {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const onScroll = () => {
    setIsTooltipOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isTooltipOpen]);

  return (
    <Fragment>
      {item.title}
      {item.allergens && (
        <sup className='text-base font-light'>
          <Tooltip
            content={item.allergens.split(',').map((allergen, i) => (
              <React.Fragment key={i}>
                {allergens[allergen.trim().toLowerCase()]}
                <br />
              </React.Fragment>
            ))}
            isOpen={isTooltipOpen}
            onOpenChange={(open) => setIsTooltipOpen(open)}
          >
            <Button
              isIconOnly
              variant='faded'
              size='sm'
              radius='full'
              className='translate-x-[-4px] translate-y-[-0px] border-transparent bg-transparent'
              onClick={() => setIsTooltipOpen((prevState) => !prevState)}
            >
              <Info />
            </Button>
          </Tooltip>
        </sup>
      )}
    </Fragment>
  );
}

export default MenuItemTitle;
