import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  height: 100%;
  width: 100%;

  /* Needed to compensate for the padding on the items */
  margin-left: -16px;

  .swiper-wrapper {
    padding-top: 16px;
  }
`;

export const ArrowArea = styled.div<{ left?: boolean; right?: boolean }>`
  display: flex;
  position: absolute;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 24px;
  left: ${(props) => (props.left ? '-64px' : '')};
  right: ${(props) => (props.right ? '-64px' : '')};
  padding: 4px;

  @media ${BREAKPOINTS.md} {
    left: ${(props) => (props.left ? '-48px' : '')};
    right: ${(props) => (props.right ? '-48px' : '')};
  }
`;
