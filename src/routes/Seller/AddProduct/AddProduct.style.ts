import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  padding: 40px 80px;
  /* position: relative; */

  @media ${BREAKPOINTS['sm']} {
    padding: 20px 20px;
    padding-top: 16px;
  }

  .title-step-text {
    margin-bottom: 20px;
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
export const SearchContainerDesktop = styled.div`
  width: 308px;
  margin-top: -10px;
`;

export const InnerHeaderContainer = styled.div<{ currentPage: number }>`
  ${(props) =>
    props.currentPage === 2 &&
    `display: flex;
    flex-direction: row;
    justify-content: space-between;`}
`;
