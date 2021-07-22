import styled from 'utils/styled';
import theme from 'utils/Theme';
import { BREAKPOINTS } from 'consts/breakpoints';

export const Tab = styled.button`
  border: 0;
  border-bottom: 1px solid ${theme.grey.shade3};
  background: transparent;
  padding: 10px 16px 10px 16px;
  font-size: 14px;
  color: ${theme.grey.shade9};
  margin-bottom: 16px;

  &.active {
    border-color: ${theme.brand.primary};
    color: ${theme.grey.shade10};
  }
`;

export const Header = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

export const FlexContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

export const SearchContainer = styled.div`
  // min-width: 300px;
  flex-grow: 1;
  @media ${BREAKPOINTS['sm']} {
    order: 1;
  }
`;

export const ActionContainer = styled.div`
  @media ${BREAKPOINTS['sm']} {
    flex-grow: 1;
    order: 2;
  }
`;

export const ChipsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Chips = styled.div`
  text-transform: uppercase;
  border-radius: 12px;
  background: #e5e8f5;
  padding: 4px 8px;
  font-weight: 700;
  font-size: 0.85em;
`;

export const TabContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
`;

export const PaginationContainer = styled.div`
  margin-top: 16px;
`;

export const ModalContentContainer = styled.div`
  margin-bottom: 12px;
`;

export const EmptyValue = styled.span`
  color: ${theme.grey.shade5};
`;
