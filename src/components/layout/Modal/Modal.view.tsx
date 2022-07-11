import React from 'react';

import { Close } from 'components/base/SVG';

import { ModalProps } from './Modal.props';
import { Backdrop, ModalContainer, ExitButton } from './Modal.style';

const Modal = (props: ModalProps): JSX.Element => {
  const { isOpen, onClickClose, children, hideClose } = props;

  return (
    <Backdrop isOpen={isOpen}>
      <ModalContainer
        backgroundColor={props.backgroundColor}
        style={props.style}
      >
        {!hideClose && (
          <ExitButton
            onClick={(e) => {
              e.preventDefault();
              onClickClose();
            }}
          >
            <Close />
          </ExitButton>
        )}
        {children}
      </ModalContainer>
    </Backdrop>
  );
};

export default Modal;
