import Typography from 'components/base/Typography';
import { fontStyle } from 'consts/textField';
import { SpecialColors } from 'utils/SFMTheme';
import styled from 'utils/styled';

export const Container = styled.div``;

export const FieldContainer = styled.div<{
  error: boolean;
  readOnly?: boolean;
  borderRadius?: string;
  height?: string;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
  width: 100%;
  height: ${({ height }) => height || '48px'};
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) => borderRadius || '4px'};
  border: 1px solid
    ${({ theme, error }) => (error ? theme.brand.error : theme.grey.shade5)};
  background-color: ${({ readOnly, theme }) =>
    readOnly ? theme.grey.shade3 : theme.grey.noshade};
`;

export const Field = styled.input<{
  disabled?: boolean;
  readOnly?: boolean;
  borderRadius?: string;
  removeArrows?: boolean;
}>`
  background-color: ${({ readOnly, theme, disabled }) =>
    readOnly || disabled ? theme.grey.shade3 : theme.grey.noshade};
  display: flex;
  flex: 1;
  border-radius: ${({ borderRadius }) => borderRadius || '4px'};
  padding: 12px 16px;
  border: 0;
  width: 100%;
  height: 100%;
  color: ${({ theme }) =>
    theme.isSFM ? SpecialColors.blue : theme.grey.shade9};
  :focus {
    outline: none;
  }
  ${fontStyle};

  ::placeholder {
    color: ${({ theme }) =>
      theme.isSFM ? theme.grey.shade6 : theme.grey.shade5};
    opacity: 1;
  }

  /* Chrome, Safari, Edge, Opera */
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  -moz-appearance: textfield;
`;

export const LeftComponentContainer = styled.div<{ disabled?: boolean }>`
  display: flex;
  min-width: 48px;
  padding: 0px 2px;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border-right: 1px solid ${({ theme }) => theme.grey.shade6};
  ${(props) => props.disabled && `background-color: ${props.theme.grey.shade3}`}
`;

export const RightComponentContainer = styled.div<{ direction?: string }>`
  display: flex;
  height: 100%;
  flex-direction: ${(props) => props.direction || 'column'};
  justify-content: center;
  align-items: center;
  // border-left: 1px solid ${({ theme }) => theme.grey.shade6};
`;

export const VisibilityContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding-right: 10px;
  padding-left: 4px;
`;

export const Error = styled(Typography)`
  margin-top: 4px;
`;

export const Prefix = styled.span`
  padding-left: 12px;
  color: ${(props) => props.theme.grey.shade8};
  ${fontStyle};
`;

export const FieldTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
`;
