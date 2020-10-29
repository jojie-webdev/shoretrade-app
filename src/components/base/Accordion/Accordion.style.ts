import styled from 'utils/styled';

export const Container = styled.div``;

export const Content = styled.div<{ isOpen?: boolean; isCheckout?: boolean }>`
  width: 100%;
  overflow: hidden;
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  padding: ${({ isOpen }) => (isOpen ? '16px 0' : '0')};
  padding-top: ${({ isCheckout }) => (isCheckout ? '0px' : '16px')};
  transition: all 0.1s ease;
`;
