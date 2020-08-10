import styled from 'utils/styled';
import theme from 'utils/Theme';

import { Variants, AlertContainerProps, AlertButtonProps } from './Alert.props';

const backgroundColor: Record<Variants, string> = {
  default:
    theme.appType === 'seller'
      ? 'rgba(165, 175, 251, 0.12)'
      : 'rgba(165, 175, 251, 0.08)',
  alert:
    theme.appType === 'seller'
      ? 'rgba(255, 207, 92, 0.12)'
      : 'rgba(255, 207, 92, 0.08)',
  error:
    theme.appType === 'seller'
      ? 'rgba(255, 100, 124, 0.12)'
      : 'rgba(255, 100, 124, 0.08)',
  success:
    theme.appType === 'seller'
      ? 'rgba(0, 196, 140, 0.12)'
      : 'rgba(0, 196, 140, 0.08)',
  warning:
    theme.appType === 'seller'
      ? 'rgba(255, 162, 107, 0.12)'
      : 'rgba(255, 162, 107, 0.08)',
};

const buttonBackgroundColor: Record<Variants, string> = {
  default: theme.brand.primary,
  alert: theme.brand.alert,
  error: theme.brand.error,
  success: theme.brand.success,
  warning: theme.brand.warning,
};

export const Container = styled.div<AlertContainerProps>`
  background-color: ${({ variant }) => backgroundColor[variant]};
  padding: 24px;
  width: 488px;

  display: flex;
  flex-direction: column;

  .top-content-container {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    .svg-container {
      margin-right: 8px;
      padding-top: 2px;
    }
  }

  .alert-button-container {
    align-self: flex-end;
  }
`;

export const AlertButton = styled.button<AlertButtonProps>`
  background-color: ${({ variant }) => buttonBackgroundColor[variant]};
  padding: 8px 32px;
  border-radius: 4px;
  border: 2px solid rgba(41, 43, 50, 0.12);

  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
  }
`;
