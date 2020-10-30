import styled from 'utils/styled';

export const Container = styled.div<{
  isOpen?: boolean;
  withBackground?: boolean;
}>`
  .interactions {
    box-shadow: ${({ withBackground }) => withBackground && 'none'};
  }
`;

export const Content = styled.div<{
  isOpen?: boolean;
  withBackground?: boolean;
}>`
  width: 100%;
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  padding: ${({ isOpen }) => (isOpen ? '16px 0' : '0')};
  padding-top: ${({ withBackground }) => (withBackground ? '0px' : '16px')};
  transition: all 0.1s ease;

  .border {
    border: ${({ theme }) => `1px solid ${theme.grey.shade3}`};
    margin: 0px 24px;
  }
`;
