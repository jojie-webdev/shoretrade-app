import styled from 'utils/styled';

import { AspectRatio, MediaQueries } from './Carousel.props';

const ImageContainerHeight: Record<AspectRatio, MediaQueries> = {
  '16:9': {
    '1440': 350,
    '1366': 309,
    '1024': 181,
    '768': 148,
    '375': 180,
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

export const SwiperArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(100% - 200px);
  overflow-x: hidden;
  position: relative;
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
  flex-wrap: wrap;
  position: absolute;
  bottom: 12px;
  left: 16px;
  width: 100%;
  z-index: 999;

  .badge {
    margin-top: 4px;
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

const safeEncodeUri = (img: string) => {
  // target parenthesis only
  return img.replace(/\(/g, '%28').replace(/\)/g, '%29');
};

export const ImageContainer = styled.div<{
  img: string;
  aspectRatio: AspectRatio;
  bgPosition?: string;
}>`
  width: 100%;
  background-image: url(${(props) => safeEncodeUri(props.img)});
  background-size: cover;
  background-position: ${(props) =>
    props.bgPosition
      ? props.bgPosition
      : props.aspectRatio === '16:9'
      ? '50% 50%'
      : '35% 65%'};
  height: 295px;
  border-radius: 4px;

  @media (max-width: 350px) {
    height: 100%;
  }

  @media (max-width: 374px) {
    height: 166px;
  }

  @media (min-width: 375px) {
    height: ${({ aspectRatio }) =>
      `${ImageContainerHeight[aspectRatio][375]}px`};

    background-position: ${(props) =>
      props.bgPosition
        ? props.bgPosition
        : props.aspectRatio === '16:9'
        ? '50% 50%'
        : '35% 65%'};
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
