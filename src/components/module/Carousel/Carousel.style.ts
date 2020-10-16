import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

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
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.div<{ img: string }>`
  width: 100%;
  background-image: url(${(props) => props.img});
  background-size: cover;
  background-position: 50% 50%;
  height: 295px;
  border-radius: 4px;

  @media (min-width: 375px) {
    height: 220px;
  }

  @media (min-width: 1024px) {
    height: 300px;
  }

  @media (min-width: 1366px) {
    height: 325px;
  }

  @media (min-width: 1440px) {
    height: 350px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: ${(props) => props.theme.grey.noshade};
  border-radius: 4px;
`;
