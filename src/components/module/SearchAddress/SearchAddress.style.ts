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
    margin-right: 24px;
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

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
