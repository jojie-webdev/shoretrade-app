import styled from 'utils/styled';

import { PlaceholderImageProps } from './PlaceholderImage.props';

export const Placeholder = styled.div<PlaceholderImageProps>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '100%'};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.grey.shade2};
  border-radius: ${({ cBorderRadius }) => cBorderRadius || 0};
`;
