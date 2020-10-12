import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  padding: 40px 80px;
  /* position: relative; */

  @media ${BREAKPOINTS['sm']} {
    padding: 40px 20px;
  }
`;

export const ProgressIndicator = styled.div`
  background: ${(props) => props.theme.brand.success};
  height: 10px;
  position: absolute;
  top: -8px;
  left: 0px;
  transition: width 0.4s ease-out;

  @media ${BREAKPOINTS['sm']} {
    top: 0px;
    height: 5px;
    z-index: 100;
  }
`;
