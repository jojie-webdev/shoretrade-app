import { BREAKPOINTS } from 'consts/breakpoints';
import { Theme } from 'types/Theme';
import styled from 'utils/styled';
import theme from 'utils/Theme';

import {
  ButtonStyleProps,
  Variants,
  ButtonSizes,
  ButtonProps,
} from './Button.props';

const backgroundColor: Record<Variants | keyof Theme['brand'], string> = {
  primary: theme.brand.primary,
  outline: 'transparent',
  disabled: theme.grey.shade3,
  success: theme.brand.success,
  unselected: theme.grey.shade9,
  white: '#FFF',
  error: theme.brand.error,
  alert: theme.brand.alert,
  info: theme.brand.info,
  warning: theme.brand.warning,
  secondary: theme.brand.secondary,
};

const border: Record<Variants, string> = {
  primary: 'none',
  outline: `1.5px solid ${theme.brand.primary}`,
  disabled: `1px solid ${theme.grey.shade5}`,
  success: 'none',
  unselected: 'none',
  white: 'none',
};

const sizePadding: Record<ButtonSizes, string> = {
  sm: '8px 12px',
  md: '18px 32px',
  lg: '',
};

export const ButtonContainer = styled.button<
  ButtonStyleProps & ButtonProps & { hasText: boolean }
>`
  max-height: 48px;
  padding: ${({ size, padding }) => padding ? padding : sizePadding[size]};
  background-color: ${({ variant, color }) =>
    color ? backgroundColor[color] : backgroundColor[variant]};
  border: ${({ variant }) => border[variant]};
  border-radius: ${({ circular, borderRadius }) => circular ? '50%' 
    : (borderRadius ? borderRadius : '12px')};
  width: ${(props) => (props.takeFullWidth ? '100%' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  :focus {
    outline: none;
  }

  :hover {
    opacity: 0.5;
  }

  @media (hover: none) and (pointer: coarse) {
    padding: ${({ size, padding }) => padding ? padding : (size === 'sm' ? sizePadding[size] : '18px')};
    :hover {
      opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    }
    :active {
      filter: brightness(85%);
      backdrop-filter: brightness(0.8);
    }
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  }

  p {
    line-height: 100%;
  }

  p:after {
    content: '${({ text }) => text}';
  }

  @media ${BREAKPOINTS.sm} {
    p:after {
      content: '${({ shortenedText, text }) =>
        shortenedText ? shortenedText : text}';
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 8px;
`;

export const IconContainer = styled.div<{
  hasText: boolean;
  iconPosition: 'before' | 'after';
}>`
  display: flex;
  align-items: center;
  margin-left: ${(props) =>
    props.hasText && props.iconPosition === 'after' ? '5px' : '0'};
  margin-right: ${(props) =>
    props.hasText && props.iconPosition === 'before' ? '5px' : '0'};
`;
