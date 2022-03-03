import styled from 'utils/styled';

import { StyledProgressLineProps } from './ProgressBar.props';

export const Container = styled.div``;

export const StyledBackgroundLine = styled.div<{
  borderRadius?: number;
}>`
  border-radius: ${({ borderRadius }) => borderRadius || 1}px;
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.grey.shade4};
  position: absolute;
`;

export const StyledProgressLine = styled.div<StyledProgressLineProps>`
  border-radius: ${({ borderRadius }) => borderRadius || 1}px;
  height: 100%;
  width: ${({ width }) => `${width}%`};
  background-color: ${({ color }) => color};
  position: absolute;
`;
