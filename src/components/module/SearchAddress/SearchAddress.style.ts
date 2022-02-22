import { BREAKPOINTS } from 'consts/breakpoints';
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
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`;

export const AddressContainer = styled.div`
  flex-direction: column;
  flex: 1;
  background: #f9faff;
  border: ${(props) => `1px solid ${props.theme.grey.shade3}`};
  border-radius: ${(props) =>
    props.theme.appType === 'buyer' ? '4px' : '100px'};

  width: 100%;
  padding: 12.5px 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .search-address-select {
    .dropdownSelectContainerThin {
      background: ${(props) => props.theme.grey.shade1};
    }
    margin-left: -16px;
  }

  @media ${BREAKPOINTS.sm} {
    padding: 10px 16px 8px;
    border-radius: 4px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

export const FiltersContainer = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 24px;

  .search-address-select .dropdownSelectContainer {
    background: ${(props) => props.theme.grey.shade3};
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
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
