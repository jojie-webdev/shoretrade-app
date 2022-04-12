import styled from 'utils/styled';

import { RadioButtonProps } from './RadioButton.props';

export const Container = styled.div<RadioButtonProps>`
  background: ${({ theme }) => theme.grey.shade9};
  padding: 8px 12px;
  height: 40px;
  border-radius: 120px;
  display: flex;
  align-items: center;

  .label {
    margin-left: 6px;
    color: ${({ theme, selected }) =>
      selected ? theme.brand.primary : theme.grey.noshade};
  }
  border: 1px solid
    ${({ theme, selected }) =>
      selected ? theme.brand.primary : theme.grey.shade8};
`;
