import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import theme from 'utils/Theme';

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
  font-weight: 900;
  color: ${theme.grey.shade9};
  font-size: 9px !important;
  letter-spacing: 2px;
`;

export const TabContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 0;
`;

export const PaginationContainer = styled.div`
  margin-top: 16px;
`;

export const ModalContentContainer = styled.div`
  margin-bottom: 20px;
`;

export const ModalTitle = styled(Typography)`
  margin-bottom: 12px;
  font-weight: 500;
`;

export const EmptyValue = styled.span`
  color: ${theme.grey.shade5};
`;

export const TableSettingsCheckbox = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const SettingsCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const MobileSearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
`;

export const MobileDownloadButton = styled.button`
  padding: 6px 12px;
  border-radius: 12px;
  border: 1.5px solid #e35d32;
  background: transparent;

  div {
    transform: rotate(90deg);
  }
`;

export const TableSettingsContainer = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #fff;
  margin-bottom: 16px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px 0px #292b320a;
  border: 0;
  width: 100%;

  div {
    display: flex;
    gap: 16px;
  }
`;

export const MobileTable = styled.div`
  border-radius: 12px;
  background: white;
  border: 1px solid #e5e8f5;
`;

export const Preloader = styled.div`
  padding: 12px 0;
`;

export const EmptyScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
`;

export const TabletHeaderSortContainer = styled.div`
  display: flex;
  align-items: center;

  .results {
    margin-right: 8px;
  }

  .dropdown {
    width: 150px;
  }
`;
