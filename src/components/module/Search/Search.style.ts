import styled from 'utils/styled';

export const InputContainer = styled.div<{ isSellerProduct?: boolean }>`
  background: #ffffff;
  border: ${(props) =>
    props.theme.appType === 'buyer'
      ? 'none'
      : `1px solid ${props.theme.grey.shade5}`};
  border-radius: ${(props) =>
    props.isSellerProduct && props.theme.appType === 'buyer'
      ? '100px'
      : props.theme.appType === 'buyer'
      ? '4px'
      : '100px'};
  width: 100%;
  padding: ${(props) =>
    props.isSellerProduct && props.theme.appType === 'buyer'
      ? '10px 10px 10px 15px'
      : props.theme.appType === 'buyer'
      ? '24px'
      : '10px 15px'};
  margin-bottom: 16px;
  box-shadow: ${(props) =>
    props.theme.appType === 'buyer'
      ? '0px 6px 12px rgba(41, 43, 50, 0.12)'
      : 'none'};

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
      font-size: ${(props) =>
        props.isSellerProduct && props.theme.appType === 'buyer'
          ? '14px'
          : '16px'};
    }
  }
`;
