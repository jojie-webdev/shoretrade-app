import { Container } from 'react-grid-system';
import styled from 'utils/styled';

export const Backdrop = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.grey.shade9};
  opacity: 0.9;

  justify-content: center;
  align-items: center;

  .row {
    height: 100%;
    width: 100%;
  }
`;

export const ModalContainer = styled.div`
  position: relative;
  width: 438px;
  background-color: ${(props) => props.theme.grey.shade8};
  border-radius: 4px;
  padding: 56px 32px;

  .title {
    margin-bottom: 24px;
  }

  .content-container {
    margin-bottom: 24px;

    .overline {
      margin-bottom: 8px;
    }
  }
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
