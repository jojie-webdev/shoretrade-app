import styled from 'utils/styled';

export const Container = styled.div<{ withBackground?: boolean }>`
  display: block;
  width: 100%;
  position: fixed;
  bottom: 0px;
  left: 0;
  padding: 24px;
  background: ${({ theme, withBackground }) =>
    withBackground ? theme.grey.shade1 : 'none'};
`;
