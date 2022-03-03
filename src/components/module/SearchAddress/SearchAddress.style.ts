import { BREAKPOINTS } from 'consts/breakpoints';
import { SpecialColors } from 'utils/SFMTheme';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 32px;
  .search-result {
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    padding-top: 24px;
  }

  @media ${BREAKPOINTS.sm} {
    flex-direction: column;
  }

  .search-product {
    flex: 3;
    margin-bottom: 0;

    border: ${(props) => `1px solid ${props.theme.grey.shade3}`};
    @media ${BREAKPOINTS.sm} {
      padding: ${(props) =>
        props.theme.appType === 'buyer' ? '12px' : '10px 15px'};
      margin-bottom: 12px;
    }

    outline: 2px solid
      ${({ theme }) => (theme.isSFM ? SpecialColors.blue : theme.grey.shade6)};
    border-radius: 12px;
    height: 56px;
  }
`;

export const AddressContainer = styled.div`
  flex-direction: column;
  flex: 1;
  border-radius: ${(props) =>
    props.theme.appType === 'buyer' ? '4px' : '100px'};

  width: 100%;
  padding: 4px 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .search-address-select {
    .dropdownSelectContainerThin {
      background: ${(props) => props.theme.grey.shade3};
    }
    margin-left: -16px;
  }

  @media ${BREAKPOINTS.sm} {
    padding: 10px 16px 8px;
    border-radius: 4px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  ${({ theme }) => {
    if (theme.isSFM) {
      return `
        height: 56px;
      `;
    }
  }}
`;

export const FiltersContainer = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 8px;

  .search-address-select .dropdownSelectContainer {
    background: ${(props) => props.theme.grey.shade3};
  }

  @media (max-width: 1400px) {
    flex-wrap: wrap;

    > div:first-of-type,
    > div:nth-of-type(2) {
      flex: 1;
    }
  }
`;

export const BuyingQuantityContainer = styled.div`
  min-width: 33%;

  .weight-input > div {
    margin-top: 8px;
  }

  .weight-input > div,
  .weight-input input {
    border-radius: 12px;
  }

  .filters {
    display: flex;
    justify-content: space-between;
    gap: 10px;

    .search-address-select {
      width: 70px;
    }

    > div:nth-of-type(2) {
      width: unset;
    }
  }

  @media (max-width: 1400px) {
    margin-top: 8px;
    width: 100%;
    min-width: 100%;

    .filters {
      .weight-input,
      .search-address-select,
      > div:nth-of-type(2) {
        width: 100%;
      }
    }
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
