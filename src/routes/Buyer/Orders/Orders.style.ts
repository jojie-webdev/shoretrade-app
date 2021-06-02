import AccordionView from 'components/base/Accordion';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col } from 'react-grid-system';
import styled from 'utils/styled';

export const Container = styled.div`
  @media ${BREAKPOINTS['sm']} {
    padding-bottom: 24px;
  }

  .controls-row {
    margin-bottom: 48px;
  }
`;

// Shared Styles

export const TitleRow = styled.div`
  margin-bottom: 12px;

  .title-col {
    display: flex;
    align-items: center;

    .svg-container {
      margin-right: 8px;
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
  max-width: 280px;
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
  margin-bottom: 16px;
`;

export const OrderBadge = styled.div`
  padding: 8px 16px;
  background: ${(props) => props.theme.grey.shade3};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-right: 24px;
  white-space: nowrap;
  width: 100px;

  p {
    line-height: 100%;
  }
`;

export const AccordionTitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .title {
    margin-right: 4px;
  }
`;
