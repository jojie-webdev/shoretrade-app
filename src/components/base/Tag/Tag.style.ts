import theme from 'utils/SFMTheme';
import styled from 'utils/styled';

import { TagProps } from './Tag.props';

export const Container = styled.div<TagProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme, alt }) =>
    theme.appType === 'seller'
      ? alt
        ? theme.grey.shade8
        : theme.grey.shade9
      : theme.grey.shade3};
  border: 1px solid;
  border-color: ${({ theme, alt }) =>
    theme.appType === 'seller'
      ? alt
        ? theme.grey.shade8
        : theme.grey.shade9
      : theme.grey.shade3};
  border-radius: 120px;
  padding: 12px;
  color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.noshade : theme.grey.shade9};
  ${({ theme, selected }) => {
    if (selected && theme.appType === 'seller') {
      return `
           border-color: ${theme.brand.primary};
           color: ${theme.brand.primary};
        `;
    }
  }};

  cursor: ${(props) =>
    props.onClick || props.onClickRemove ? 'pointer' : 'inherit'};
`;
