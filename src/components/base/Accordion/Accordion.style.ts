import styled from 'utils/styled';

export const Container = styled.div<{ marginBottom: string }>`
  margin-bottom: ${(props) => props.marginBottom};
`;

export const Content = styled.div<{ isOpen?: boolean; padding?: string }>`
  width: 100%;
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  padding: ${({ isOpen, padding }) => (isOpen ? padding || '16px 0' : '0')};

  transition: height 0.1s ease, overflow 0.1s ease;
`;
