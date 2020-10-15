import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
export const InputContainer = styled.div`
  background: #ffffff;
  border: ${(props) => `1px solid ${props.theme.grey.shade5}`};
  border-radius: ${(props) =>
    props.theme.appType === 'buyer' ? '4px' : '100px'};
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  width: 100%;
  padding: ${(props) =>
    props.theme.appType === 'buyer' ? '24px' : '10px 15px'};
  margin-bottom: 16px;

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
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .wrapper {
    width: calc(100% - 200px);
    margin: auto;

    @media ${BREAKPOINTS['sm']} {
      width: 100%;
    }

    @media ${BREAKPOINTS['md']} {
      width: calc(100% - 150px);
    }
  }
`;

export const AddressContainer = styled.div`
  background: #f9faff;
  border: ${(props) => `1px solid ${props.theme.grey.shade5}`};
  border-radius: ${(props) =>
    props.theme.appType === 'buyer' ? '4px' : '100px'};
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  width: 100%;
  margin-bottom: 16px;
  padding: 13px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .Dropdown-placeholder {
    background: #f9faff;
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
