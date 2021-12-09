import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const InputContainer = styled.div<{
  rounded?: boolean;
  darkMode?: boolean;
}>`
  background: ${({ darkMode, theme }) =>
    darkMode ? theme.grey.shade9 : theme.grey.noshade};
  border: ${({ darkMode, theme }) =>
    darkMode ? 'none' : `1px solid ${theme.grey.shade6}`};
  border-radius: ${(props) =>
    props.rounded && props.theme.appType === 'buyer'
      ? '10px 12px'
      : props.theme.appType === 'buyer'
      ? '4px'
      : '12px'};
  width: 100%;
  padding: ${(props) =>
    props.rounded && props.theme.appType === 'buyer'
      ? '10px 10px 10px 15px'
      : props.theme.appType === 'buyer'
      ? '19px 13px'
      : '6px 12px'};
  margin-bottom: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .close-svg-container {
    display: flex;
    justify-content: center;
    align-items: center;
    :hover {
      cursor: pointer;
    }
  }

  :focus-within {
    border: 1px solid
      ${({ darkMode, theme }) =>
        darkMode ? theme.grey.shade7 : theme.grey.shade6};
  }

  input {
    flex: 1;
    border: 0;
    margin: 0 10px;
    height: 100%;
    width: inherit;
    font-weight: normal;
    background: ${({ darkMode, theme }) =>
      darkMode ? theme.grey.shade9 : theme.grey.noshade};
    ${({ darkMode, theme }) =>
      darkMode ? `color: ${theme.grey.noshade};` : ''}
    :focus {
      outline: none;
      border: none;
    }

    ::placeholder {
      color: ${({ darkMode, theme }) =>
        darkMode ? theme.grey.shade7 : theme.grey.shade5};
      font-size: ${(props) =>
        props.rounded && props.theme.appType === 'buyer'
          ? '14px'
          : props.rounded
          ? '14px'
          : '16px'};
    }

    @media ${BREAKPOINTS['sm']} {
      width: 100%;
      height: 38px;
    }
  }

  @media ${BREAKPOINTS.sm} {
    height: 40px;
    padding: 11px 13px;
  }
`;
