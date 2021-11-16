import styled from 'utils/styled';

export const Container = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: column;
  position: fixed;
  height: calc(var(--vh, 1vh) * 100);
  width: 100vw;
  bottom: 0;
  right: 0;
  z-index: 3333;
  background-color: rgba(9, 19, 29, 0.9);
`;

export const Backdrop = styled.div`
  position: relative;
  height: calc(var(--vh, 1vh) * 20);
  width: 100vw;
`;

export const ModalContainer = styled.div<{
  backgroundColor?: string;
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

export const ExitButton = styled.button`
  position: absolute;
  top: -20px;
  right: -20px;
  background: ${(props) => props.theme.grey.noshade};
  box-shadow: 0px 12px 24px rgba(41, 43, 50, 0.25);
  border-radius: 20px;
  height: 40px;
  width: 40px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  :focus {
    outline: none;
  }
`;

export const CloseContainer = styled.button`
  position: absolute;
  z-index: 1;
  right: 0px;
  top: 135px;
  background: ${(props) => props.theme.grey.noshade};
  box-shadow: 0px 12px 24px rgba(41, 43, 50, 0.25);
  border-radius: 20px;
  height: 40px;
  width: 40px;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;

  :focus {
    outline: none;
  }
`;
