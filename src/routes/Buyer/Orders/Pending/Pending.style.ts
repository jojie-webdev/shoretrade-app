import AccordionView from 'components/base/Accordion';
import Interaction from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import { Row, Col } from 'react-grid-system';
import styled from 'utils/styled';

export const Confirmed = styled(Typography)`
  margin-bottom: 4px;
`;

export const StyledInteraction = styled(Interaction)`
  // margin-bottom: 12px;
  border-radius: 4px;
  box-shadow: none;
`;

export const CollapsibleContent = styled.div<{ isOpen?: boolean }>`
  width: 100%;
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  padding: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  transition: all 0.1s ease;
  z-index: 1;
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
