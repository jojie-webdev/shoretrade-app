import styled from 'utils/styled';

import { AspectRatio, MediaQueries } from './SwiperContainer.props';

const ParentHeight: Record<AspectRatio, MediaQueries> = {
  '16:9': {
    '1440': 350,
    '1366': 325,
    '1024': 183,
    '768': 151,
    '375': 220,
  },
  '9:4': {
    '1440': 440,
    '1366': 408,
    '1024': 256,
    '768': 240,
    '375': 156,
  },
  '8:7': {
    '1440': 445,
    '1366': 445,
    '1024': 445,
    '768': 595,
    '375': 287,
  },
};

export const Parent = styled.div<{
  height?: string;
  aspectRatio: AspectRatio;
  addMargin?: boolean;
}>`
  display: flex;
  height: ${({ height }) => height || '295px'};
  width: 100%;

  @media (min-width: 375px) {
    height: ${({ aspectRatio }) => `${ParentHeight[aspectRatio][375]}px`};
  }

  @media (min-width: 768px) {
    height: ${({ aspectRatio }) => `${ParentHeight[aspectRatio][768]}px`};
  }

  @media (min-width: 1024px) {
    height: ${({ aspectRatio }) => `${ParentHeight[aspectRatio][1024]}px`};
    margin-top: 0px;
  }

  @media (min-width: 1366px) {
    height: ${({ aspectRatio }) => `${ParentHeight[aspectRatio][1366]}px`};
  }

  @media (min-width: 1440px) {
    height: ${({ aspectRatio }) => `${ParentHeight[aspectRatio][1440]}px`};
  }
`;

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;

  .swiper-container {
    width: 100%;
    max-width: 100%;
    height: 100%;
    border-radius: 4px;
  }
`;
