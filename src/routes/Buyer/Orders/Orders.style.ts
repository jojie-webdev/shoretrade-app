import AccordionView from 'components/base/Accordion';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 24px;
  }

  .controls-row {
    width: 100%;
    margin-bottom: 32px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 32px;
  }

  .tabs {
    width: 340px;

    @media ${BREAKPOINTS['sm']} {
      width: 100%;
      margin-bottom: 16px;
    }
  }
`;

// Shared Styles

export const TitleRow = styled.div`
  margin-top: 24px;
  margin-bottom: 12px;

  .title-col {
    display: flex;
    align-items: center;

    .svg-container {
      margin-right: 8px;
    }

    .notification {
      border-radius: 8px;
      padding: 4px 8px;
      background: ${({ theme }) => theme.brand.alert};
      font-size: 11px;
      font-weight: 900;
      margin-left: 8px;
      color: ${({ theme }) => theme.grey.shade9};
    }

    .notif-reg {
      background: ${({ theme }) => theme.grey.shade9};
      color: ${({ theme }) => theme.grey.noshade};
    }
  }
`;

export const SearchFilterRow = styled.div`
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const SearchContainer = styled.div`
  width: 380px;
  position: relative;
`;

export const DateRangeContainer = styled.div`
  width: 100%;
  max-width: 300px;
  position: relative;
  bottom: 10px; //offset
`;

export const LeftContainer = styled(Col)``;

export const AccordionContainer = styled.div`
  background-color: #fff;

  // shadow-color: rgba(41, 43, 50, 0.12);
  shadow-opacity: 0.34;
  shadow-radius: 6.27;
  shadow-offset: 0 5px;
  elevation: 5;
  // margin-left: 16px;
  // margin-right: 16px;
  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);

  // border: 1px solid blue;

  :not(:last-child) {
    margin-bottom: 16px;
  }
`;

export const StyledAccordion = styled(AccordionView)`
  margin-bottom: 8px;
`;

export const OrderBadge = styled.div`
  padding: 8px 8px 6px 8px;
  background: ${(props) => props.theme.grey.shade3};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-right: 24px;
  white-space: nowrap;

  p {
    line-height: 100%;
  }
`;

export const CollectableBadge = styled.div`
  padding: 8px 8px 6px 8px;
  background: ${(props) => props.theme.brand.info};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-right: 24px;
  white-space: nowrap;

  p {
    line-height: 100%;
  }
`;

export const AccordionTitleContainer = styled.div<{
  border?: string;
}>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .label {
    margin-right: 10px;
  }

  span {
    width: 28px;
    height: 28px;
    justify-content: center;
    align-items: center;
    display: flex;
  }
`;

export const AlertContainer = styled.div`
  overflow: hidden;
  height: 98px;
  transition: all 0.5s ease-in-out;
  &.hidden {
    height: 0;
  }
  @media ${BREAKPOINTS['sm']} {
    height: 120px;
  }
`;
