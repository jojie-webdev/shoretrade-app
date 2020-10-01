import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import Touchable from 'components/base/Touchable';
// import SwiperCore, { Autoplay } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';

import { SwiperContainerProps } from './SwiperContainer.props';
import { Parent, Container } from './SwiperContainer.style';

// SwiperCore.use([Autoplay]);

const debounce = (fn: () => void, ms: number) => {
  let timer: NodeJS.Timeout | null;
  return () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn();
    }, ms);
  };
};

/**
 *
 * This component computes dynamic swiper width to avoid overflow
 *
 */
const SwiperContainer = (props: SwiperContainerProps): JSX.Element => {
  const { children, height } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  // calculate a definite width so that it won't overflow
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
  }, [containerRef, windowWidth]);

  // helps to trigger recalculation of width
  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(null);
      setWindowWidth(window.innerWidth);
    };

    const debouncedHandler = debounce(handleResize, 200);

    window.addEventListener('resize', debouncedHandler);

    return () => {
      window.removeEventListener('resize', debouncedHandler);
    };
  });

  return (
    <Parent ref={containerRef} height={height}>
      {containerWidth && (
        <Container style={{ width: containerWidth }}>{children}</Container>
      )}
    </Parent>
  );
};

export default React.memo(SwiperContainer);
