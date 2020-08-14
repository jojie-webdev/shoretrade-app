import { props } from 'ramda';
import { Theme } from 'types/Theme';
import styled from 'utils/styled';
import theme from 'utils/Theme';

export const Container = styled.div`
  height: 40px;

  box-shadow: 0px 12px 24px rgba(41, 43, 50, 0.25);
  background: ${(props) =>
    props.theme.appType === 'buyer'
      ? props.theme.grey.noshade
      : props.theme.grey.shade9};
  border-radius: 4px;

  display: inline-flex;
  flex-direction: row;
`;

const ControlButtonColor: Record<'buyer' | 'seller', string> = {
  buyer: theme.brand.primary,
  seller: theme.grey.noshade,
};

const ContolButtonTextColor = (
  active: boolean,
  appType: 'buyer' | 'seller'
): string => {
  if (appType === 'buyer') {
    return active ? theme.grey.noshade : theme.grey.shade5;
  } else {
    return active ? theme.grey.shade9 : theme.grey.noshade;
  }
};

export const ControlButton = styled.button<{ active: boolean }>`
  height: 100%;
  width: 90px;
  border-radius: 4px;
  border: none;
  background: ${(props) =>
    props.active ? ControlButtonColor[props.theme.appType] : 'none'};

  display: flex;
  justify-content: center;
  align-items: center;

  /* Text Properties */
  font-size: 14px;
  color: ${(props) => ContolButtonTextColor(props.active, props.theme.appType)};

  :focus {
    outline: none;
  }
`;
