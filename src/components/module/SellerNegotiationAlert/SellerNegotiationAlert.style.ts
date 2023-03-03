import { Theme } from 'types/Theme';
import styled from 'utils/styled';

import { Variants, AlertContainerProps } from './SellerNegotiationAlert.props';

const backgroundColor = (theme: Theme): Record<Variants, string> => {
  return {
    info: theme.brand.info,
    infoAlert: theme.brand.alert,
    alert: theme.brand.alert,
    error: theme.brand.error,
    success: theme.brand.success,
    warning: theme.brand.warning,
    primary: theme.brand.primary,
  };
};

export const Container = styled.div<AlertContainerProps>`
  display: flex;
  background-color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.noshade};
  width: ${(props) => (props.fullWidth ? '100%' : '500px')};
  box-shadow: 0 4px 12px rgba(41, 43, 50, 0.04);
  border-radius: 8px;

  .horizontal-style-container {
    background-color: ${({ variant, theme }) =>
      backgroundColor(theme)[variant]};
    height: inherit;
    width: 8px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .content-container {
    display: flex;
    flex-direction: row;
    padding: 16px 16px 16px 0;
    align-items: ${(props) => props.alignText}; // defaults to 'flex-start'
    width: 100%;

    .svg-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 18px;
      height: 20px;
      width: 20px;
      padding-top: 2px;
    }

    .text-container {
      width: 100%;
    }
  }
`;

export const AlertContainer = styled.div`
  margin: auto;
  padding: 0px 20px 0px 0px;
`;
