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
      <Row className="row" justify="center" align="center">
        <Col xs={10} sm={6} md={4} lg={4}>
          <ModalContainer style={props.style}>
            <ExitButton onClick={onClickClose}>
              <Close />
            </ExitButton>
            {children}
          </ModalContainer>
        </Col>
      </Row>
    </Backdrop>
  );
};

export default Modal;
