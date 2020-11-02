import styled from 'utils/styled';

export const Container = styled.div<{
  isOpen?: boolean;
  withBackground?: boolean;
  marginBottom: string;
}>`
  margin-bottom: ${(props) => props.marginBottom};
  .interactions {
    box-shadow: ${({ withBackground }) => withBackground && 'none'};
  }
`;

export const Content = styled.div<{
  isOpen?: boolean;
  padding?: string;
  withBackground?: boolean;
}>`
  width: 100%;
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  padding: ${({ isOpen, padding }) => (isOpen ? padding || '16px 0' : '0')};
  transition: height 0.1s ease, overflow 0.1s ease;
  padding-top: ${({ withBackground }) => (withBackground ? '0px' : '16px')};

  .border {
    border: ${({ theme }) => `1px solid ${theme.grey.shade3}`};
    margin: 0px 24px;
  }
`;
