import React from 'react';

import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';

import { MobileModalProps } from './MobileModal.props';
import { Container, Backdrop, ModalContainer } from './MobileModal.style';

const MobileModal = (props: MobileModalProps): JSX.Element => {
  const { isOpen, onClickClose, children } = props;
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  if (!isSmallScreen) return <></>;

  return (
    <Container isOpen={isOpen}>
      <Backdrop
        style={props.backdropStyle}
        onClick={(e) => {
          e.preventDefault();
          onClickClose();
        }}
      />
      <ModalContainer
        backgroundColor={props.backgroundColor}
        style={props.modalStyle}
      >
        {children}
      </ModalContainer>
    </Container>
  );
};

export default React.memo(MobileModal);
