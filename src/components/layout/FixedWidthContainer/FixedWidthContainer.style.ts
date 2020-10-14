import styled from 'utils/styled';

export const Container = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}px`};
`;
