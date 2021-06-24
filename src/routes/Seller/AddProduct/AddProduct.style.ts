import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  padding: 48px;
  /* position: relative; */

  @media ${BREAKPOINTS['genericTablet']} {
    padding: 32px;
  }

  @media ${BREAKPOINTS['sm']} {
    padding: 16px 8px;
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
    z-index: 999;
  }
`;
export const SearchContainerDesktop = styled.div`
  width: 308px;
  margin-top: -10px;
  @media ${BREAKPOINTS['iPad']} {
    width: 250px;
  }
`;

export const InnerHeaderContainer = styled.div<{ currentPage: number }>`
  ${(props) =>
    props.currentPage === 2 &&
    `display: flex;
    flex-direction: row;
    justify-content: space-between;`}
`;
