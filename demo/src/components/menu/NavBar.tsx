import { twMerge } from 'tailwind-merge';
import React, { useEffect, useState } from 'react';
import ArrowRight from '@/components/icons/ArrowRight';
import ArrowLeft from '@/components/icons/ArrowLeft';
import { Menu } from '@/types/restaurant';

interface Props {
  menu: Menu;
}

function NavBar({ menu }: Props) {
  /* Use States */
  const [menuActive, setMenuActive] = useState('');
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
    if (slider == null) return;

    initialNavPositions = {
      left: slider.scrollLeft,
      x: e.clientX
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  const mouseMoveHandler = function (e: MouseEvent) {
    const slider = document.getElementById('categorySlider');
    if (slider == null) return;
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

  const clickCategoryHandler = (id: string) => {
    if (navMove) {
      setNavMove(false);
      return;
    }
    var category = document.getElementById('category' + id);
    var slider = document.getElementById('categorySlider');
    if (category == null) return;
    if (slider == null) return;
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
  const scrollNavbarToItem = (categoryId: string) => {
    const slider = document.getElementById('categorySlider');
    if (slider == null) return;
    const sliderItem = document.getElementById(categoryId);
    if (sliderItem == null) return;
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
    if (slider == null) return;

    slider.scrollBy({
      top: 0,
      left: pixelX,
      behavior: 'smooth'
    });
  };

  const updateScrollButtons = () => {
    const slider = document.getElementById('categorySlider');
    if (slider == null) return;

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
    if (slider == null) return;

    slider.addEventListener('scroll', updateScrollButtons);

    // Observe each anchor
    const observer = new IntersectionObserver(
      function (entries) {
        if (entries.length > 1) return; // Workaround Navbar: Return if more than one observable entry fired. Ofter appears if navbar was clicked and window.scrollTo is executed
        const entry = entries[0];

        if (entry.rootBounds == null) return;

        // If element scrolls inside view from top then select the parent category
        if (
          entry.isIntersecting &&
          entry.target.getBoundingClientRect().y < entry.rootBounds.height / 2
        ) {
          if (entry.target.parentElement) {
            const categoryId = entry.target.parentElement.id ?? '';
            setMenuActive(categoryId);
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
            const categoryId =
              entry.target.parentElement.nextElementSibling.id ?? '';
            setMenuActive(categoryId);
          }
        }
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
    };
  }, []);

  return (
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
            <ArrowLeft />
          </div>
        </div>
        {/* Nav Items*/}
        <div
          className='mx-auto flex select-none flex-row gap-x-4 overflow-x-scroll whitespace-nowrap bg-white px-2 py-2 scrollbar-hide'
          id='categorySlider'
          onMouseDown={(e) => mouseDownHandler(e)}
        >
          {menu.categories.map((category, index) => {
            return (
              <div
                key={category.id}
                onClick={() => {
                  clickCategoryHandler(category.id);
                }}
                id={'categorySliderItem' + category.id}
                className={twMerge(
                  `text-md cursor-default snap-center rounded-full px-4 py-2 font-bold sm:cursor-pointer`,
                  menuActive == category.id ? 'bg-black text-white' : '',
                  index === 0 ? 'ml-4 lg:ml-0' : ''
                )}
              >
                {category.name}
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
            <ArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
