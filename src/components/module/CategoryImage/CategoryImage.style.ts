import styled from 'utils/styled';

export const Container = styled.div<{
  cBorderRadius?: string;
  circled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  background-color: ${({ circled, theme }) =>
    circled
      ? theme.grey.shade8
      : theme.appType === 'buyer'
      ? theme.grey.noshade
      : theme.grey.shade9};
  flex: 1;
  border-radius: ${({ cBorderRadius }) => cBorderRadius || '0'};
`;

export const Circle = styled.div<{ circleSize?: number }>`
  height: ${({ circleSize }) => (circleSize ? `${circleSize}px` : '75px')};
  width: ${({ circleSize }) => (circleSize ? `${circleSize}px` : '75px')};
  border-radius: 50%;
  background-color: ${({ theme }) => theme.grey.shade9};
  display: flex;
  align-items: center;
  justify-content: center;
`;
