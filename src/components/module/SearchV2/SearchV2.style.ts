import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const InputContainer = styled.div<{ rounded?: boolean }>`
  background: ${(props) =>
    props.theme.appType === 'buyer'
      ? props.theme.grey.noshade
      : props.theme.grey.shade9};
  border: ${(props) =>
    `1px solid ${
      props.theme.appType === 'buyer'
        ? props.theme.grey.shade5
        : props.theme.grey.shade8
    }`};
  border-radius: ${(props) =>
    props.rounded && props.theme.appType === 'buyer'
      ? '12px'
      : props.theme.appType === 'buyer'
      ? '4px'
      : '12px'};
  width: 100%;
  padding: ${(props) =>
    props.rounded && props.theme.appType === 'buyer'
      ? '10px 10px 10px 15px'
      : props.theme.appType === 'buyer'
      ? '19px 13px'
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
    background: ${(props) =>
      props.theme.appType === 'buyer'
        ? props.theme.grey.noshade
        : props.theme.grey.shade9};
    color: ${(props) =>
      props.theme.appType === 'buyer'
        ? props.theme.grey.shade9
        : props.theme.grey.noshade};
    flex: 1;
    border: 0;
    margin: 0 10px;
    height: 100%;

    :focus {
      outline: none;
      border: none;
    }

    ::placeholder {
      color: ${(props) =>
        props.theme.appType === 'buyer'
          ? props.theme.grey.shade5
          : props.theme.grey.shade7};
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

  .close-svg-container {
    display: none;
  }

  @media ${BREAKPOINTS.sm} {
    height: 40px;
    padding: 11px 13px;
  }
`;
