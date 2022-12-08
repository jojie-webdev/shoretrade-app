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

  .size-chart-container {
    padding: 16px 16px 12px 16px;
    background-color: ${({ theme }) => theme.grey.shade9};
    border-radius: 8px;
    width: fit-content;
    position: absolute;
    top: 48px;
    right: 48px;

    @media ${BREAKPOINTS['sm']} {
      position: static;
      top: auto;
      right: auto;
    }

    @media ${BREAKPOINTS['sm']} {
      margin-bottom: 12px;
    }

    .tooltip-container {
      margin: 0;

      .tooltip-content-container {
        width: 300px;
      }

      .__react_component_tooltip.show {
        opacity: 100%;
      }

      .table-header-col,
      .table-col {
        padding: 8px !important;
        display: flex;
      }

      .table-col:not(:first-of-type) {
        background: ${({ theme }) => theme.grey.shade9};
      }

      .table-header-col:not(:last-of-type),
      .table-col:not(:last-of-type) {
        border-right: 1px solid ${({ theme }) => theme.grey.shade8};
      }

      .table-header-row,
      .table-row:not(:last-of-type) {
        border-bottom: 1px solid ${({ theme }) => theme.grey.shade8};
      }
    }
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

export const ExitContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  margin-bottom: 8px;
`;

export const InnerHeaderContainer = styled.div<{
  currentPage: number;
  isFlex: boolean;
}>`
  ${(props) =>
    (props.currentPage === 2 || props.isFlex) &&
    `display: flex;
    flex-direction: row;
    justify-content: space-between;`}
`;
