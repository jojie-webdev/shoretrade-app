import styled from 'utils/styled';

export const Container = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(9, 19, 29, 0.9);
`;

export const Backdrop = styled.div`
  position: relative;
  height: 20vh;
  width: 100vw;
`;

export const ModalContainer = styled.div<{
  backgroundColor?: string;
  containerHeight?: string;
}>`
  position: relative;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 40px 24px 8px 24px;
  height: 140vh;
  width: 100vw;
  background-color: ${({ theme, backgroundColor }) => {
    const isSeller = theme.appType === 'seller';

    return (
      backgroundColor || (isSeller ? theme.grey.shade8 : theme.grey.shade1)
    );
  }};
`;
