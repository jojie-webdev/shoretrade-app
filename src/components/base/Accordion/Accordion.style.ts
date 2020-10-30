import styled from 'utils/styled';

export const Container = styled.div<{ marginBottom: string }>`
  margin-bottom: ${(props) => props.marginBottom};
`;

export const Content = styled.div<{ isOpen?: boolean }>`
  width: 100%;
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  padding: ${({ isOpen }) => (isOpen ? '16px 0' : '0')};
  transition: all 0.1s ease;
`;
