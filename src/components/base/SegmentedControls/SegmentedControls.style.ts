import { Theme } from 'types/Theme';
import styled from 'utils/styled';

export const Container = styled.div`
  height: 40px;
  width: 100%;
  // box-shadow: 0px 12px 24px rgba(41, 43, 50, 0.25);
  box-shadow: 0px 0px 12px rgba(41, 43, 50, 0.05);
  background: ${(props) =>
    props.theme.appType === 'buyer'
      ? props.theme.grey.noshade
      : props.theme.grey.shade9};
  border-radius: 12px;

  display: inline-flex;
  flex-direction: row;

  .row {
    width: 100%;
  }
`;

const ControlButtonColor = (
  theme: Theme,
  backgroundColor?: string
): Record<'buyer' | 'seller', string> => {
  return {
    buyer: backgroundColor || theme.grey.shade8,
    seller: backgroundColor || theme.grey.noshade,
  };
};

const ControlButtonTextColor = (
  theme: Theme,
  active: boolean,
  appType: 'buyer' | 'seller',
  textColor?: string
): string => {
  if (appType === 'buyer') {
    return active
      ? theme.grey.noshade
      : textColor
      ? textColor
      : theme.grey.shade6;
  } else {
    return active
      ? theme.grey.shade9
      : textColor
      ? textColor
      : theme.grey.noshade;
  }
};

export const ControlButton = styled.button<{
  active: boolean;
  backgroundColor?: string;
  inactiveBackgroundColor?: string;
  textColor?: string;
}>`
  height: 100%;
  min-width: 90px;
  width: 100%;
  border-radius: 12px;
  border: none;
  background: ${(props) =>
    props.active
      ? ControlButtonColor(props.theme, props.backgroundColor)[
          props.theme.appType
        ]
      : props.inactiveBackgroundColor || 'none'};

  /* Text Properties */
  font-size: 14px;
  color: ${(props) =>
    ControlButtonTextColor(
      props.theme,
      props.active,
      props.theme.appType,
      props.textColor
    )};
  font-weight: 400;
  line-height: 20px;

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
    color: ${({ theme }) => theme.grey.noshade};
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
