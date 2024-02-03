import MenuItem from '@/components/menu/MenuItem';
import Hero from '@/components/menu/Hero';
import { Menu } from '@/types/restaurant2';

interface Props {
  menu: Menu;
}

function Menu({ menu }: Props) {
  return (
    <div className='bg-gray-50 py-10'>
      <div className='flex flex-col space-y-10'>
        {menu.categories.map((category) => {
          return (
            <div key={category.id} id={'category' + category.id}>
              <div className='container mx-auto'>
                {category.imageUrl && (
                  <div className='container mx-auto max-w-5xl px-0 py-2'>
                    <Hero
                      imgSrc={category.imageUrl}
                      heroAlt={category.name}
                      tailwindClasses={'h-44 rounded-xl overflow-hidden'}
                    />
                  </div>
                )}
                <h2 className='container mx-auto max-w-5xl px-0 py-4 text-2xl font-bold'>{category.name}</h2>
              </div>
              <div className='flex flex-col space-y-5'>
                {category.productIds.map((productId, index) => {
                  const product = menu.products.find((value) => value.id === productId);
                  console.assert(product, `ProductId ${productId} not found.`);
                  return product && <MenuItem key={index} menu={menu} product={product} />;
                })}
              </div>
              <div className='categoryAnchor mx-auto'/>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
