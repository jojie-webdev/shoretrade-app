import styled from 'utils/styled';
import theme from 'utils/Theme';

export const Container = styled.div`
  height: 40px;
  width: 100%;
  // box-shadow: 0px 12px 24px rgba(41, 43, 50, 0.25);
  box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  background: ${(props) =>
    props.theme.appType === 'buyer'
      ? props.theme.grey.noshade
      : props.theme.grey.shade9};
  border-radius: 4px;

  display: inline-flex;
  flex-direction: row;

  .row {
    width: 100%;
  }
`;

const ControlButtonColor: Record<'buyer' | 'seller', string> = {
  buyer: theme.grey.shade8,
  seller: theme.grey.noshade,
};

const ControlButtonTextColor = (
  active: boolean,
  appType: 'buyer' | 'seller'
): string => {
  if (appType === 'buyer') {
    return active ? theme.grey.noshade : theme.grey.shade8;
  } else {
    return active ? theme.grey.shade9 : theme.grey.noshade;
  }
};

export const ControlButton = styled.button<{ active: boolean }>`
  height: 100%;
  min-width: 90px;
  width: 100%;
  border-radius: 4px;
  border: none;
  background: ${(props) =>
    props.active ? ControlButtonColor[props.theme.appType] : 'none'};

  /* Text Properties */
  font-size: 14px;
  color: ${(props) =>
    ControlButtonTextColor(props.active, props.theme.appType)};
  font-weight: 500;
  line-height: 24px;

  display: flex;
  justify-content: center;
  align-items: center;

  :focus {
    outline: none;
  }

  .tooltip {
    margin-left: 6px;
    margin-bottom: 4px;
  }

  .tooltip .tooltip-text {
    visibility: hidden;
    width: 320px;
    background-color: black;
    color: ${() => theme.grey.noshade};
    text-align: center;
    border-radius: 6px;
    padding: 8px;
    position: absolute;
    z-index: 1;
  }

  .tooltip:hover .tooltip-text {
    visibility: visible;
  }
`;
