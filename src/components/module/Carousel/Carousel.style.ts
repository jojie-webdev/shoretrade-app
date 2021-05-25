import {
  AspectRatio,
  MediaQueries,
} from 'components/module/Carousel/Carousel.props';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

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
  '8:7': {
    '1440': 445,
    '1366': 445,
    '1024': 445,
    '768': 595,
    '375': 287,
  },
};

export const SwiperArea = styled.div<{ variant?: 'thumbnail' }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  width: 100%;
  ${(props) => props.variant === 'thumbnail' && `min-height: 342px;`}
`;

export const LeftInsideArrowArea = styled.div`
  position: absolute;
  left: 8px;
  top: 0px;
  bottom: 0px;
  display: flex;
  width: 40px;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const RightInsideArrowArea = styled(LeftInsideArrowArea)`
  left: auto;
  right: 8px;
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 64px;
  left: 16px;
  width: 100%;
  z-index: 999;

  @media ${BREAKPOINTS['sm']} {
    bottom: 12px;
  }
`;

export const ArrowButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 20px;
  cursor: pointer;

  :hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

export const ArrowArea = styled.div`
  display: flex;
  width: 100px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const PaginationArea = styled.div`
  display: flex;
  width: 100px;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const safeEncodeUri = (img: string) => {
  // target parenthesis only
  return img.replace(/\(/g, '%28').replace(/\)/g, '%29');
};

export const ImageContainer = styled.div<{
  img: string;
  aspectRatio: AspectRatio;
}>`
  width: 100%;
  background-image: url(${(props) => safeEncodeUri(props.img)});
  background-size: cover;
  background-position: ${(props) =>
    props.aspectRatio === '16:9' ? '50% 50%' : '50% 65%'};
  height: 295px;
  border-radius: 4px;

  @media (min-width: 375px) {
    height: ${({ aspectRatio }) =>
      `${ImageContainerHeight[aspectRatio][375]}px`};

    background-position: ${(props) =>
      props.aspectRatio === '16:9' ? '50% 50%' : '35% 65%'};
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

  @media ${BREAKPOINTS['xl']} {
    min-height: 342px;
  }
  @media ${BREAKPOINTS['sm']} {
    min-height: 242px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: ${(props) => props.theme.grey.noshade};
  border-radius: 4px;
`;

export const ActionButtonContainer = styled.div`
  display: block;
  position: absolute;
  top: 16px;
  right: 16px;
  width: auto;
  z-index: 999;
`;

export const ThumbNavContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;

  .swiper-slide {
    margin-right: 8px;
    width: 48px;
    height: 48px;
  }
`;

export const ThumbNav = styled(Image)<{ active: boolean }>`
  width: 44px;
  height: 44px;
  cursor: pointer;
  margin-right: 8px;
  opacity: ${(props) => (props.active ? 1 : 0.5)};
`;
