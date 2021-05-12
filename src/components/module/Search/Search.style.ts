import styled from 'utils/styled';

export const InputContainer = styled.div<{ rounded?: boolean }>`
  background: ${(props) => props.theme.grey.noshade};
  border: ${(props) => `1px solid ${props.theme.grey.shade5}`};
  border-radius: ${(props) =>
    props.rounded && props.theme.appType === 'buyer'
      ? '100px'
      : props.theme.appType === 'buyer'
      ? '4px'
      : '100px'};
  width: 100%;
  padding: ${(props) =>
    props.rounded && props.theme.appType === 'buyer'
      ? '10px 10px 10px 15px'
      : props.theme.appType === 'buyer'
      ? '24px'
      : '10px 15px'};
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
      font-size: ${(props) =>
        props.rounded && props.theme.appType === 'buyer'
          ? '14px'
          : props.rounded
          ? '14px'
          : '16px'};
    }
  }
`;
