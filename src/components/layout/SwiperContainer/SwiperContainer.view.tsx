import React, { useEffect, useRef, useState } from 'react';

import { SwiperContainerProps } from 'components/layout/SwiperContainer/SwiperContainer.props';
import {
  Parent as ParentNew,
  Container as ContainerNew,
} from 'components/layout/SwiperContainer/SwiperContainer.style';
import {
  Parent as ParentOld,
  Container as ContainerOld,
} from 'components/layout/SwiperContainer/SwiperContainer.style.old';
import useHomeOld from 'utils/Hooks/useHomeOld';

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
  const {
    children,
    height,
    aspectRatio = '16:9',
    addMargin,
    onResize,
    variant,
  } = props;
  const isOld = useHomeOld();
  const Parent = isOld ? ParentOld : ParentNew;
  const Container = isOld ? ContainerOld : ContainerNew;

  const containerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);

  // calculate a definite width so that it won't overflow
  useEffect(() => {
    if (
      containerRef.current &&
      containerWidth !== containerRef.current.offsetWidth
    ) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    // eslint-disable-next-line
  }, [containerRef?.current?.offsetWidth, windowWidth]);

  // helps to trigger recalculation of width
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const debouncedHandler = debounce(handleResize, 200);

    window.addEventListener('resize', debouncedHandler);

    return () => {
      window.removeEventListener('resize', debouncedHandler);
    };
  });

  useEffect(() => {
    // prevent onResize to fire on initialization
    if (containerWidth !== null) {
      if (!isInitialized) {
        setIsInitialized(true);
      } else {
        if (onResize) {
          onResize();
        }
      }
    }
    // eslint-disable-next-line
  }, [containerWidth]);

  return (
    <Parent
      ref={containerRef}
      height={height}
      aspectRatio={aspectRatio}
      addMargin={addMargin}
      variant={variant}
    >
      {containerWidth && (
        <Container style={{ width: containerWidth }}>{children}</Container>
      )}
    </Parent>
  );
};

export default React.memo(SwiperContainer);
