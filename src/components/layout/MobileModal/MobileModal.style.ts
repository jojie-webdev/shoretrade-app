import styled from 'utils/styled';

export const Container = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: fixed;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba(9, 19, 29, 0.9);
`;

export const Backdrop = styled.div`
  position: relative;
  height: calc(var(--vh, 1vh) * 20);
  width: 100vw;
`;

export const ModalContainer = styled.div<{
  backgroundColor?: string;
  containerHeight?: string;
}>`
  position: relative;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  padding: 40px 24px 0px 24px;
  width: 100vw;
  overflow-y: scroll;
  height: calc(var(--vh, 1vh) * 80);
  background-color: ${({ theme, backgroundColor }) => {
    const isSeller = theme.appType === 'seller';

    return (
      backgroundColor || (isSeller ? theme.grey.shade8 : theme.grey.shade1)
    );
  }};
`;
