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
`;

export const InputContainer = styled.div`
  background: #ffffff;
  border: ${(props) => `1px solid ${props.theme.grey.shade3}`};
  border-radius: ${(props) =>
    props.theme.appType === 'buyer' ? '4px' : '100px'};
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  width: 100%;
  padding: ${(props) =>
    props.theme.appType === 'buyer' ? '24px' : '10px 15px'};
  flex: 3;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .close-svg-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    flex: 1;
    border: 0;
    margin: 0 10px;
    height: 100%;

    :focus {
      outline: none;
      border: none;
    }

    ::placeholder {
      color: ${(props) => props.theme.grey.shade5};
    }
  }

  .dropdownSelectContainerThin {
    margin-top: 0 !important;
  }

  @media ${BREAKPOINTS.sm} {
    padding: ${(props) =>
      props.theme.appType === 'buyer' ? '12px' : '10px 15px'};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
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

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
