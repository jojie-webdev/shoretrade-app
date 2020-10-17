import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

import { AspectRatio, MediaQueries } from './Carousel.props';

const ImageContainerHeight: Record<AspectRatio, MediaQueries> = {
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

export const SwiperArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(100% - 200px);
  overflow-x: hidden;
`;

export const ArrowArea = styled.div`
  display: flex;
  width: 100px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.div<{
  img: string;
  aspectRatio: AspectRatio;
}>`
  width: 100%;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: ${(props) =>
    props.aspectRatio === '16:9' ? '50% 50%' : '50% 65%'};
  height: 295px;
  border-radius: 4px;

  @media (min-width: 375px) {
    height: ${({ aspectRatio }) =>
      `${ImageContainerHeight[aspectRatio][375]}px`};
  }

  @media (min-width: 768px) {
    height: ${({ aspectRatio }) =>
      `${ImageContainerHeight[aspectRatio][768]}px`};
    margin-top: 0px;
  }

  @media (min-width: 1024px) {
    height: ${({ aspectRatio }) =>
      `${ImageContainerHeight[aspectRatio][1024]}px`};
  }

  @media (min-width: 1366px) {
    height: ${({ aspectRatio }) =>
      `${ImageContainerHeight[aspectRatio][1366]}px`};
  }

  @media (min-width: 1440px) {
    height: ${({ aspectRatio }) =>
      `${ImageContainerHeight[aspectRatio][1440]}px`};
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: ${(props) => props.theme.grey.noshade};
  border-radius: 4px;
`;
