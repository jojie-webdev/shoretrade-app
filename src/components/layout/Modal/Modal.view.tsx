import React from 'react';

// import { useTheme } from 'utils/Theme';
import { Close } from 'components/base/SVG';
import { Row, Col } from 'react-grid-system';

import { ModalProps } from './Modal.props';
import { Backdrop, ModalContainer, ExitButton } from './Modal.style';

const Modal = (props: ModalProps): JSX.Element => {
  // const theme = useTheme();

  const { isOpen, onClickClose, children } = props;

  return (
    <Backdrop isOpen={isOpen}>
      <ModalContainer backgroundColor={props.backgroundColor} style={props.style}>
        <ExitButton
          onClick={(e) => {
            e.preventDefault();
            onClickClose();
          }}
        >
          <Close />
        </ExitButton>
        {children}
      </ModalContainer>
    </Backdrop>
  );
};

export default Modal;
