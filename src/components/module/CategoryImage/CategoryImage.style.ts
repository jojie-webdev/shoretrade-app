import styled from 'utils/styled';

export const Container = styled.div<{
  cBorderRadius?: string;
  circled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  background-color: ${({ circled, theme }) => {
    if (circled) {
      if (theme.isSFM && theme.appType === 'buyer') {
        return `${theme.grey.shade5};`;
      }
      return `${theme.grey.shade8};`;
    }

    if (theme.appType === 'buyer') {
      return `${theme.grey.noshade};`;
    }
    return `${theme.grey.shade9}'`;
  }}
    
  flex: 1;
  border-radius: ${({ cBorderRadius }) => cBorderRadius || '0'};
`;

export const Circle = styled.div<{ circleSize?: number }>`
  height: ${({ circleSize }) => (circleSize ? `${circleSize}px` : '75px')};
  width: ${({ circleSize }) => (circleSize ? `${circleSize}px` : '75px')};
  border-radius: 50%;
  background-color: ${({ theme }) =>
    theme.isSFM && theme.appType === 'buyer' ? '#CADDF2' : theme.grey.shade9};
  display: flex;
  align-items: center;
  justify-content: center;
`;
