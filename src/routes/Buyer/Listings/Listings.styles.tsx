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
  width: 30%;
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

  margin-right: 10px;
`;

export const ChipsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const Chips = styled.div<{
  background: string;
  color: string;
}>`
  text-transform: uppercase;
  border-radius: 12px;
  background: ${({ background }) => background};
  padding: 4px 8px;
  font-weight: 900;
  color: ${({ color }) => color};
  font-size: 9px !important;
  letter-spacing: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  margin: 16px 0;
  border-radius: 12px;
  box-shadow: 0px 4px 12px 0px #292b320a;
  border: 0;
  width: 100%;

  div {
    display: flex;
    gap: 16px;
  }
`;

export const MobileTable = styled.div``;

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

export const MobileResults = styled.div`
  margin-bottom: 12px;
  color: ${theme.grey.shade6};
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  .checkbox-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 12px;
    gap: 12px;
  }

  .total-count {
    color: ${theme.grey.shade9};
  }
`;

export const TabItem = styled.div`
  display: flex;

  .tab-label {
    margin-right: 6px;
  }
`;

export const Tag = styled.div<{
  background?: string;
}>`
  background: ${({ theme }) => theme.grey.shade3};
  padding: 4px 8px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${BREAKPOINTS['sm']} {
    padding: 5px 0px;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const NegotiableTextWrapper = styled(Typography)`
  color: #32357a;
  margin-right: 5px;
  font-family: 'Basis Grotesque Pro';
`;
