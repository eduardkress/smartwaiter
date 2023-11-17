'use client';

import Image from 'next/image';
import { HiMapPin, HiPhone, HiClock } from 'react-icons/hi2';
import { useEffect, useState } from 'react';
import _menuItem from '@/mockup/menu2.json';
import { Menu } from '@/types/menu';
import { twMerge } from 'tailwind-merge';
import Link from 'next/link';
import ItemModal from '@/components/ui/ItemModal';

const menu = _menuItem as Menu[];

const Menu = () => {
  /* Use States */
  const [menuActive, setMenuActive] = useState(1);
  const [navMove, setNavMove] = useState(false);
  const [scrollButtonActive, setScrollButtonActive] = useState({
    left: false,
    right: false
  });

  /* Variables */
  let initialNavPositions = { left: 0, x: 0 };

  /* Event handler */
  const mouseDownHandler = function (e: React.MouseEvent) {
    const slider = document.getElementById('categorySlider');
    if (slider == null || slider == undefined) return;

    initialNavPositions = {
      left: slider.scrollLeft,
      x: e.clientX
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = function (e: MouseEvent) {
    const slider = document.getElementById('categorySlider');
    if (slider == null || slider == undefined) return;
    // How far the mouse has been moved
    const dx = e.clientX - initialNavPositions.x;
    if (dx > 10 || dx < -10) {
      // Scroll the element
      const prev = slider.scrollLeft;
      slider.scrollLeft = initialNavPositions.left - dx;
      if (prev !== slider.scrollLeft) {
        //Scrolled => click event will trigger, but needs to be skipped
        setNavMove(true);
      } else {
        //Scrolled out of bound => click event will not trigger on category element & wont reset value
        setNavMove(false);
      }
    }
  };

  const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  };

  const clickCategoryHandler = (id: number) => {
    if (navMove) {
      setNavMove(false);
      return;
    }
    var category = document.getElementById('category' + id);
    var slider = document.getElementById('categorySlider');
    if (category == null || category == undefined) return;
    if (slider == null || slider == undefined) return;
    var categoryPosition = category.getBoundingClientRect().top;
    var offsetPosition =
      categoryPosition + window.pageYOffset - slider.offsetHeight;

    setMenuActive(id);

    window.scrollTo({
      top: offsetPosition,
      behavior: 'instant'
    });
  };

  /* Functions */
  const scrollNavbarToItem = (id: number) => {
    const slider = document.getElementById('categorySlider');
    if (slider == null || slider == undefined) return;
    const sliderItem = document.getElementById('categorySliderItem' + id);
    if (sliderItem == null || sliderItem == undefined) return;
    // let mdLeft = window.matchMedia("(min-width: 768px)").matches ? 0 : 32;
    // console.log(mdLeft);

    const scrollPosition = sliderItem.offsetLeft - slider.offsetLeft - 12;

    slider.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  };

  const scrollNavbarXByPixel = (pixelX: number) => {
    const slider = document.getElementById('categorySlider');
    if (slider == null || slider == undefined) return;

    slider.scrollBy({
      top: 0,
      left: pixelX,
      behavior: 'smooth'
    });
  };

  const updateScrollButtons = () => {
    const slider = document.getElementById('categorySlider');
    if (slider == null || slider == undefined) return;

    setScrollButtonActive({
      left: slider.scrollLeft > 8,
      right: slider.scrollLeft < slider.scrollWidth - slider.clientWidth - 8
    });
  };

  /* Use Effects */
  useEffect(() => {
    scrollNavbarToItem(menuActive);
  }, [menuActive]);

  useEffect(() => {
    // Get the anchor elements
    const categoryAnchors = document.querySelectorAll('.categoryAnchor');

    const slider = document.getElementById('categorySlider');
    if (slider == null || slider == undefined) return;

    slider.addEventListener('scroll', updateScrollButtons);

    // Observe each anchor
    const observer = new IntersectionObserver(
      function (entries, observer) {
        if (entries.length > 1) return; // Workaround Navbar: Return if more than one observable entry fired. Ofter appears if navbar was clicked and window.scrollTo is executed
        const entry = entries[0];

        if (entry.rootBounds == null || entry.rootBounds == undefined) return;

        // If element scrolls inside view from top then select the parent category
        if (
          entry.isIntersecting &&
          entry.target.getBoundingClientRect().y < entry.rootBounds.height / 2
        ) {
          if (entry.target.parentElement) {
            const id = entry.target.parentElement.id ?? '';
            const number = id.replace('category', '');
            setMenuActive(Number(number));
          }
        }
        // Else if element scrolls outside view from top then select the parents next sibling category
        else if (
          !entry.isIntersecting &&
          entry.target.getBoundingClientRect().y < entry.rootBounds.height / 2
        ) {
          if (
            entry.target.parentElement &&
            entry.target.parentElement.nextElementSibling
          ) {
            const id = entry.target.parentElement.nextElementSibling.id ?? '';
            const number = id.replace('category', '');
            setMenuActive(Number(number));
          }
        }
        // Handling Last Category: if element scrolls inside view from bottom check if it is the last category then we need to select it but only if last category heigth is smaller than viewport
        // else if (
        //   entry.isIntersecting &&
        //   entry.target.getBoundingClientRect().y >
        //     entry.rootBounds.height / 2 &&
        //   entry.target.parentElement?.id ==
        //     entry.target.parentElement?.parentElement?.lastElementChild?.id &&
        //   entry.target.parentElement &&
        //   entry.target.parentElement.getBoundingClientRect().height <
        //     entry.rootBounds.height
        // ) {
        //   if (entry.target.parentElement) {
        //     const id = entry.target.parentElement.id ?? "";
        //     const number = id.replace("category", "");
        //     setMenuActive(Number(number));
        //     scrollNavbarSmooth(Number(number));<
        //   }
        // }
        // // Handling Last Category: if element scrolls outside view from bottom check if it is the last category then we need to select previous category but only if last category heigth is smaller than viewport
        // else if (
        //   !entry.isIntersecting &&
        //   entry.target.getBoundingClientRect().y >
        //     entry.rootBounds.height / 2 &&
        //   entry.target.parentElement?.id ==
        //     entry.target.parentElement?.parentElement?.lastElementChild?.id &&
        //   entry.target.parentElement &&
        //   entry.target.parentElement.getBoundingClientRect().height <
        //     entry.rootBounds.height
        // ) {
        //   if (
        //     entry.target.parentElement &&
        //     entry.target.parentElement.previousElementSibling
        //   ) {
        //     const id =
        //       entry.target.parentElement.previousElementSibling.id ?? "";
        //     const number = id.replace("category", "");
        //     setMenuActive(Number(number));
        //     scrollNavbarSmooth(Number(number));
        //   }
        // }
      },
      {
        rootMargin: `${slider.clientHeight * -1}px 0px 0px 0px`
      }
    );

    if (observer) {
      for (let anchor of categoryAnchors) {
        observer.observe(anchor);
      }
    }

    return () => {
      slider.removeEventListener('scroll', updateScrollButtons);
      // Unobserve each anchor
      if (observer) {
        observer.disconnect();
        for (let anchor of categoryAnchors) {
          observer.unobserve(anchor);
        }
      }
      //   const observer = categoryObserver();
      //   if (observer) {
      //     observer.disconnect();
      //     for (let anchor of categoryAnchors) {
      //       observer.unobserve(anchor);
      //     }
      //   }
    };
  }, []);

  return (
    <div id='mainArea'>
      {/*Hero*/}
      <div className='relative h-80 w-full'>
        <div className='absolute inset-0'>
          <Image
            src='/images/hero-restaurants.jpeg'
            alt='Unser Menü'
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      {/*Company Logo*/}
      <div className='container mx-auto flex h-20 max-w-2xl justify-center bg-green-200 bg-transparent'>
        <div className='relative h-40 w-40 -translate-y-20 rounded-lg border bg-white shadow'>
          <div className='absolute inset-0'>
            <Image
              className='p-2'
              src='/images/losteria.svg'
              alt='Unser Menü'
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
      {/*Title section*/}

      <div className='w-full bg-white'>
        {/*Company details*/}
        <div className='container mx-auto flex max-w-5xl flex-col items-center justify-between space-y-5 bg-transparent pb-10 pt-5 sm:flex-row sm:items-stretch sm:space-y-0'>
          <div className='flex flex-col items-center sm:items-stretch'>
            <h1 className='text-3xl font-bold'>Losteria</h1>
            <div className='mt-2 text-sm text-gray-600'>
              <div className='flex flex-row flex-nowrap gap-x-2'>
                <div className='flex flex-row flex-nowrap fill-yellow-600'>
                  <svg
                    viewBox='0 0 16 16'
                    width='1em'
                    height='1em'
                    role='presentation'
                    focusable='false'
                    aria-hidden='true'
                  >
                    <path d='M12.288 14.449l-4.183-2.197a.219.219 0 00-.21 0L3.713 14.45 4.5 9.794a.254.254 0 000-.193L1.07 6.302l4.673-.682a.228.228 0 00.166-.114L8 1.271l2.091 4.235a.227.227 0 00.167.114l4.672.682-3.386 3.3a.254.254 0 00-.061.192l.805 4.655z'></path>
                  </svg>
                  <svg
                    viewBox='0 0 16 16'
                    width='1em'
                    height='1em'
                    role='presentation'
                    focusable='false'
                    aria-hidden='true'
                  >
                    <path d='M12.288 14.449l-4.183-2.197a.219.219 0 00-.21 0L3.713 14.45 4.5 9.794a.254.254 0 000-.193L1.07 6.302l4.673-.682a.228.228 0 00.166-.114L8 1.271l2.091 4.235a.227.227 0 00.167.114l4.672.682-3.386 3.3a.254.254 0 00-.061.192l.805 4.655z'></path>
                  </svg>
                  <svg
                    viewBox='0 0 16 16'
                    width='1em'
                    height='1em'
                    role='presentation'
                    focusable='false'
                    aria-hidden='true'
                  >
                    <path d='M12.288 14.449l-4.183-2.197a.219.219 0 00-.21 0L3.713 14.45 4.5 9.794a.254.254 0 000-.193L1.07 6.302l4.673-.682a.228.228 0 00.166-.114L8 1.271l2.091 4.235a.227.227 0 00.167.114l4.672.682-3.386 3.3a.254.254 0 00-.061.192l.805 4.655z'></path>
                  </svg>
                  <svg
                    viewBox='0 0 16 16'
                    width='1em'
                    height='1em'
                    role='presentation'
                    focusable='false'
                    aria-hidden='true'
                  >
                    <path d='M12.288 14.449l-4.183-2.197a.219.219 0 00-.21 0L3.713 14.45 4.5 9.794a.254.254 0 000-.193L1.07 6.302l4.673-.682a.228.228 0 00.166-.114L8 1.271l2.091 4.235a.227.227 0 00.167.114l4.672.682-3.386 3.3a.254.254 0 00-.061.192l.805 4.655z'></path>
                  </svg>
                  <svg
                    viewBox='0 0 16 16'
                    width='1em'
                    height='1em'
                    role='presentation'
                    focusable='false'
                    aria-hidden='true'
                  >
                    <path d='M12.288 14.449l-4.183-2.197a.219.219 0 00-.21 0L3.713 14.45 4.5 9.794a.254.254 0 000-.193L1.07 6.302l4.673-.682a.228.228 0 00.166-.114L8 1.271l2.091 4.235a.227.227 0 00.167.114l4.672.682-3.386 3.3a.254.254 0 00-.061.192l.805 4.655z'></path>
                  </svg>
                </div>
                <Link href='/' className='text-sm font-light underline'>
                  80 Bewertungen
                </Link>
              </div>
            </div>
            <span className='mt-2 text-sm text-gray-700'>
              Slogan: Food that makes you say wow.
            </span>
          </div>
          <div className='flex flex-col justify-center gap-y-2 text-sm'>
            <div className='flex flex-row items-center gap-x-4'>
              <HiMapPin className='h-6 w-6 flex-shrink-0' />
              <span>Bertholdstraße 2, 33142 Büren</span>
            </div>
            <div className='flex flex-row items-center gap-x-4'>
              <HiClock className='h-6 w-6 flex-shrink-0' />
              <span>11:00 - 21:30 Uhr</span>
            </div>
            <div className='flex flex-row items-center gap-x-4'>
              <HiPhone className='h-6 w-6 flex-shrink-0' />
              <span>01234 - 56789</span>
            </div>
          </div>
        </div>
      </div>

      {/*Navigation*/}
      <div className='sticky top-0 z-10 h-14 w-full bg-white'>
        <div className='container flex max-w-5xl items-center justify-between px-0'>
          {/* < */}
          <div
            className={twMerge(
              'hidden p-2',
              scrollButtonActive.left ? 'md:block' : 'hidden'
            )}
          >
            <div
              onClick={() => {
                scrollNavbarXByPixel(-100);
              }}
              id={'categorySliderScrollButtonLeft'}
              className='text-md cursor-default snap-center rounded-full bg-gray-200 p-3 font-bold text-black shadow-sm hover:bg-gray-300 sm:cursor-pointer'
            >
              <svg
                viewBox='0 0 16 16'
                width='1em'
                height='1em'
                role='presentation'
                focusable='false'
                aria-hidden='true'
              >
                <path d='M10.96 2.82L5.605 8l5.399 5.197-.875.963-5.565-5.364a1.164 1.164 0 010-1.671l5.495-5.25.901.945z'></path>
              </svg>
            </div>
          </div>
          {/* Nav Items*/}
          <div
            className='mx-auto flex select-none flex-row gap-x-4 overflow-x-scroll whitespace-nowrap bg-white px-2 py-2 scrollbar-hide'
            id='categorySlider'
            onMouseDown={(e) => mouseDownHandler(e)}
          >
            {menu.map((categorie, index) => {
              return (
                <div
                  key={categorie.id}
                  onClick={() => {
                    clickCategoryHandler(categorie.id);
                  }}
                  id={'categorySliderItem' + categorie.id}
                  className={twMerge(
                    `text-md cursor-default snap-center rounded-full px-4 py-2 font-bold sm:cursor-pointer`,
                    menuActive == categorie.id ? 'bg-black text-white' : '',
                    index === 0 ? 'ml-4 lg:ml-0' : ''
                  )}
                >
                  {categorie.categoryName}
                </div>
              );
            })}
          </div>
          {/* > */}
          <div
            className={twMerge(
              'hidden p-2 md:block',
              scrollButtonActive.right ? 'visible' : 'invisible'
            )}
          >
            <div
              onClick={() => {
                scrollNavbarXByPixel(100);
              }}
              id={'categorySliderScrollButtonRight'}
              className='text-md cursor-default snap-center rounded-full bg-gray-200 p-3 font-bold text-black shadow-sm hover:bg-gray-300 sm:cursor-pointer'
            >
              <svg
                viewBox='0 0 16 16'
                width='1em'
                height='1em'
                role='presentation'
                focusable='false'
                aria-hidden='true'
              >
                <path d='M5.044 13.18L10.399 8 5 2.82l.875-.962 5.539 5.346a1.164 1.164 0 010 1.636l-5.469 5.285-.901-.945z'></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/*Menu*/}
      <div className='bg-gray-50 py-10'>
        <div className='flex flex-col space-y-10'>
          {menu.map((categorie) => {
            return (
              <div
                key={categorie.id}
                id={'category' + categorie.id}
                className=''
              >
                {/* <div className="categoryStartAnchor mx-auto"></div> */}
                <div className='container mx-auto'>
                  <h2 className='container mx-auto max-w-5xl px-0 py-4 text-2xl font-bold'>
                    {categorie.categoryName}
                  </h2>
                </div>
                <div className='flex flex-col space-y-5'>
                  {categorie.items.map((item, index) => {
                    return <ItemModal key={index} item={item} />;
                  })}
                </div>
                {/* <div className="categoryEndAnchor mx-auto"></div> */}
                <div className='categoryAnchor mx-auto'></div>
              </div>
            );
          })}
        </div>
      </div>

      {/*Footer*/}
      <div className='container mx-auto my-8'>
        {/*Impressum*/}
        <div className='flex flex-col justify-center gap-y-2'>
          <div className='flex flex-row flex-nowrap items-center gap-x-1'>
            <div className='h-6 w-6 fill-black'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                x='0px'
                y='0px'
                viewBox='0 0 50 50'
              >
                <path d='M 13 4 C 8.0414839 4 4 8.0414839 4 13 L 4 37 C 4 41.958516 8.0414839 46 13 46 L 37 46 C 41.958516 46 46 41.958516 46 37 L 46 13 C 46 8.0414839 41.958516 4 37 4 L 13 4 z M 13 6 L 37 6 C 37.355032 6 37.659445 6.150633 38 6.2011719 L 38 43.798828 C 37.659445 43.849367 37.355032 44 37 44 L 13 44 C 9.1225161 44 6 40.877484 6 37 L 6 13 C 6 9.1225161 9.1225161 6 13 6 z M 40 6.7304688 C 42.352068 7.856447 44 10.209434 44 13 L 44 14 L 40 14 L 40 6.7304688 z M 22 12 C 14.832139 12 9 17.832144 9 25 C 9 32.167856 14.832139 38 22 38 C 29.167861 38 35 32.167856 35 25 C 35 17.832144 29.167861 12 22 12 z M 22 14 C 28.086982 14 33 18.913022 33 25 C 33 27.822097 31.934808 30.383342 30.195312 32.328125 C 28.169802 30.27163 25.239791 29 22 29 C 18.758932 29 15.833876 30.276672 13.808594 32.333984 C 12.066333 30.388584 11 27.824608 11 25 C 11 18.913022 15.913018 14 22 14 z M 40 16 L 44 16 L 44 24 L 40 24 L 40 16 z M 22 18 C 20.416667 18 19.101892 18.629756 18.251953 19.585938 C 17.402014 20.542119 17 21.777778 17 23 C 17 24.222222 17.402014 25.457882 18.251953 26.414062 C 19.101892 27.370244 20.416667 28 22 28 C 23.583333 28 24.898108 27.370244 25.748047 26.414062 C 26.597986 25.457881 27 24.222222 27 23 C 27 21.777778 26.597986 20.542118 25.748047 19.585938 C 24.898108 18.629756 23.583333 18 22 18 z M 22 20 C 23.083333 20 23.768559 20.370244 24.251953 20.914062 C 24.735347 21.457881 25 22.222222 25 23 C 25 23.777778 24.735347 24.542118 24.251953 25.085938 C 23.768559 25.629756 23.083333 26 22 26 C 20.916667 26 20.231441 25.629756 19.748047 25.085938 C 19.264653 24.542119 19 23.777778 19 23 C 19 22.222222 19.264653 21.457882 19.748047 20.914062 C 20.231441 20.370244 20.916667 20 22 20 z M 40 26 L 44 26 L 44 34 L 40 34 L 40 26 z M 22 31 C 24.694386 31 27.092805 32.055926 28.730469 33.695312 C 26.87065 35.135558 24.540932 36 22 36 C 19.4616 36 17.134304 35.136865 15.275391 33.699219 C 16.913049 32.060657 19.305741 31 22 31 z M 40 36 L 44 36 L 44 37 C 44 39.790566 42.352068 42.143553 40 43.269531 L 40 36 z'></path>
              </svg>
            </div>
            <span className='font-bold'>Impressum</span>
          </div>
          <div className='flex flex-col flex-nowrap text-sm text-gray-400'>
            <span>Losteria GmbH</span>
            <span>Sesamstraße 123</span>
            <span>Vertretungsberechtigt: Max Mustermann</span>
            <span>Fax: 012123123123</span>
            <span className='mt-4'>Registergericht: Amtsgericht Paderborn</span>
            <span>Registernummer: HRB 1233123</span>
            <span className='mt-4'>MwSt-Nummer: DE311435310</span>
            <span className='mt-4'>
              Plattform der EU-Kommission zur Online-Streitbeilegung:
              https://ec.europa.eu/consumers/odr
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
