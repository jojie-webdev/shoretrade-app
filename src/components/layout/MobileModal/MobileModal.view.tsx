import React, { useEffect } from 'react';

import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';

import { MobileModalProps } from './MobileModal.props';
import { Container, Backdrop, ModalContainer } from './MobileModal.style';

const MobileModal = (props: MobileModalProps): JSX.Element => {
  const { isOpen, onClickClose, children } = props;
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  useEffect(() => {
    return () => {
      document.getElementsByTagName('body')[0].classList.remove('no-scroll');
    };
  }, []);

  if (!isSmallScreen) return <></>;

  if (isOpen) {
    document.getElementsByTagName('body')[0].classList.add('no-scroll');
  }

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
