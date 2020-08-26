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
    circled ? theme.grey.shade8 : theme.grey.shade9};
  flex: 1;
  border-radius: ${({ cBorderRadius }) => cBorderRadius || '0'};
`;

export const Circle = styled.div`
  height: 64px;
  width: 64px;
  border-radius: 32px;
  background-color: ${({ theme }) => theme.grey.shade9};
  display: flex;
  align-items: center;
  justify-content: center;
`;
