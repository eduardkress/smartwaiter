import React, { useState, useEffect, useRef, useCallback } from "react";

const Scrollbar = ({
  children,
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);
  const observer = useRef<ResizeObserver | null>(null);
  const [thumbHeight, setThumbHeight] = useState(20);
  const [scrollStartPosition, setScrollStartPosition] = useState<number | null>(
    null,
  );
  const [initialScrollTop, setInitialScrollTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollNeeded, setScrollNeeded] = useState(false);

  function handleResize(ref: HTMLDivElement, trackSize: number) {
    const { clientHeight, scrollHeight } = ref;
    setThumbHeight(Math.max((clientHeight / scrollHeight) * trackSize, 20));
  }

  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const { current: trackCurrent } = scrollTrackRef;
      const { current: contentCurrent } = contentRef;
      if (trackCurrent && contentCurrent) {
        const { clientY } = e;
        const target = e.target as HTMLDivElement;
        const rect = target.getBoundingClientRect();
        const trackTop = rect.top;
        const thumbOffset = -(thumbHeight / 2);
        const clickRatio =
          (clientY - trackTop + thumbOffset) / trackCurrent.clientHeight;
        const scrollAmount = Math.floor(
          clickRatio * contentCurrent.scrollHeight,
        );
        contentCurrent.scrollTo({
          top: scrollAmount,
          behavior: "smooth",
        });
      }
    },
    [thumbHeight],
  );

  const handleThumbPosition = () => {
    if (
      !contentRef.current ||
      !scrollTrackRef.current ||
      !scrollThumbRef.current
    ) {
      return;
    }
    const { scrollTop: contentTop, scrollHeight: contentHeight } =
      contentRef.current;
    const { clientHeight: trackHeight } = scrollTrackRef.current;
    let newTop = (+contentTop / +contentHeight) * trackHeight;
    newTop = Math.min(newTop, trackHeight - thumbHeight);
    const thumb = scrollThumbRef.current;
    thumb.style.top = `${newTop}px`;
  };

  const handleThumbMousedown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setScrollStartPosition(e.clientY);
    if (contentRef.current) setInitialScrollTop(contentRef.current.scrollTop);
    setIsDragging(true);
  }, []);

  const handleThumbMouseup = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging) {
        setIsDragging(false);
      }
    },
    [isDragging],
  );

  const handleThumbMousemove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isDragging) {
        const {
          scrollHeight: contentScrollHeight,
          offsetHeight: contentOffsetHeight,
        } = contentRef.current!;

        const deltaY =
          (e.clientY - scrollStartPosition!) *
          (contentOffsetHeight / thumbHeight);
        const newScrollTop = Math.min(
          initialScrollTop + deltaY,
          contentScrollHeight - contentOffsetHeight,
        );

        contentRef.current!.scrollTop = newScrollTop;
      }
    },
    [isDragging, scrollStartPosition, thumbHeight],
  );

  // If the content and the scrollbar track exist, use a ResizeObserver to adjust height of thumb and listen for scroll event to move the thumb
  useEffect(() => {
    if (contentRef.current && scrollTrackRef.current) {
      const ref = contentRef.current;
      const { clientHeight: trackSize } = scrollTrackRef.current;
      setScrollNeeded(trackSize !== thumbHeight);
      observer.current = new ResizeObserver(() => {
        handleResize(ref, trackSize);
      });
      observer.current.observe(ref);
      ref.addEventListener("scroll", handleThumbPosition);
      return () => {
        observer.current?.unobserve(ref);
        ref.removeEventListener("scroll", handleThumbPosition);
      };
    }
  }, [thumbHeight]);

  // Listen for mouse events to handle scrolling by dragging the thumb
  useEffect(() => {
    document.addEventListener("mousemove", handleThumbMousemove);
    document.addEventListener("mouseup", handleThumbMouseup);
    document.addEventListener("mouseleave", handleThumbMouseup);
    return () => {
      document.removeEventListener("mousemove", handleThumbMousemove);
      document.removeEventListener("mouseup", handleThumbMouseup);
      document.removeEventListener("mouseleave", handleThumbMouseup);
    };
  }, [handleThumbMousemove, handleThumbMouseup]);

  return (
    <div className="custom-scrollbars__container">
      <div className="custom-scrollbars__content" ref={contentRef} {...props}>
        {children}
      </div>
      <div className="custom-scrollbars__scrollbar">
        <div className="custom-scrollbars__track-and-thumb">
          <div
            className="custom-scrollbars__track"
            ref={scrollTrackRef}
            onClick={handleTrackClick}
            style={{ cursor: isDragging ? "grabbing" : undefined }}
          ></div>
          {scrollNeeded && (
            <div
              className="custom-scrollbars__thumb"
              ref={scrollThumbRef}
              onMouseDown={handleThumbMousedown}
              style={{
                height: `${thumbHeight}px`,
                cursor: isDragging ? "grabbing" : "grab",
              }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scrollbar;
