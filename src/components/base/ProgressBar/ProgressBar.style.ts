import styled from 'utils/styled';

import { StyledProgressLineProps } from './ProgressBar.props';

export const Container = styled.div``;

export const StyledBackgroundLine = styled.div`
  border-radius: 1px;
  height: 2px;
  width: 100%;
  background-color: ${({ theme }) => theme.grey.shade4};
  position: absolute;
`;

export const StyledProgressLine = styled.div<StyledProgressLineProps>`
  border-radius: 1px;
  height: 2px;
  width: ${({ width }) => `${width}%`};
  background-color: ${({ theme }) => theme.brand.success};
  position: absolute;
`;
