import React from 'react';

import { Close } from 'components/base/SVG';
import { useTheme } from 'utils/Theme';

import { ModalProps } from './Modal.props';
import { Backdrop, ModalContainer, ExitButton } from './Modal.style';

const Modal = (props: ModalProps): JSX.Element => {
  const { isOpen, onClickClose, children } = props;
  const theme = useTheme();

  return (
    <Backdrop isOpen={isOpen}>
      <ModalContainer
        backgroundColor={props.backgroundColor}
        style={props.style}
      >
        <ExitButton
          onClick={(e) => {
            e.preventDefault();
            onClickClose();
          }}
        >
          <Close fill={theme.grey.noshade} />
        </ExitButton>
        {children}
      </ModalContainer>
    </Backdrop>
  );
};

export default Modal;
