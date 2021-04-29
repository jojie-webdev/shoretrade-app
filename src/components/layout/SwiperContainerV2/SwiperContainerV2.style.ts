import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

import { AspectRatio, MediaQueries } from './SwiperContainerV2.props';

const ParentHeight: Record<AspectRatio, MediaQueries> = {
  '16:9': {
    '1440': 350,
    '1366': 325,
    '1024': 300,
    '768': 220,
    '375': 220,
  },
  '9:4': {
    '1440': 440,
    '1366': 408,
    '1024': 256,
    '768': 240,
    '375': 156,
  },
};

export const Parent = styled.div<{
  height?: string;
  aspectRatio: AspectRatio;
  addMargin?: boolean;
  variant?: string;
}>`
  display: flex;
  height: ${({ height }) => height || '325px'};
  width: 100%;

  @media (min-width: 375px) {
    height: ${({ aspectRatio }) => `${ParentHeight[aspectRatio][375] + 30}px`};
  }

  @media (min-width: 768px) {
    height: ${({ aspectRatio }) => `${ParentHeight[aspectRatio][768] + 30}px`};
  }

  @media (min-width: 1024px) {
    height: ${({ aspectRatio }) => `${ParentHeight[aspectRatio][1024] + 30}px`};
    margin-top: 0px;
  }

  @media (min-width: 1366px) {
    height: ${({ aspectRatio }) => `${ParentHeight[aspectRatio][1366] + 30}px`};
  }

  @media (min-width: 1440px) {
    height: ${({ aspectRatio }) => `${ParentHeight[aspectRatio][1440] + 30}px`};
  }
  ${(props) =>
    props.variant === 'thumbnail' &&
    `  @media ${BREAKPOINTS['ipadPro']} {
    min-height: 394px;
  }`}
  @media ${BREAKPOINTS['sm']} {
    min-height: 242px;
  }
`;

export const Container = styled.div<{ variant?: string }>`
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;

  .swiper-container {
    width: 100%;
    max-width: 100%;
    height: 100%;
    border-radius: 4px;

    ${(props) =>
      props.variant === 'thumbnail' &&
      `   @media ${BREAKPOINTS['ipadPro']} {
      min-height: 342px;
      height: 342px;
    }`}
  }

  .swiper-pagination {
    display: block;
    position: relative;
    bottom: 0;

    .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
      display: inline-block;
      border-radius: 100%;
      background: ${({ theme }) => theme.grey.shade5};
      opacity: 0.2;
      margin: 0 4px;
      @media ${BREAKPOINTS['sm']} {
        background: ${({ theme }) => theme.grey.noshade};
      }
    }

    .swiper-pagination-bullet-active {
      opacity: 1;
      background: ${({ theme }) => theme.brand.primary};
      @media ${BREAKPOINTS['sm']} {
        background: ${({ theme }) => theme.grey.noshade};
      }
    }
  }
`;
