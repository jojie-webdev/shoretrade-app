import React from 'react';

// import { useTheme } from 'utils/Theme';
import Button from 'components/base/Button';
import { Close } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { Row, Col } from 'react-grid-system';

import { ModalProps } from './Modal.props';
import { Backdrop, ModalContainer, ExitButton } from './Modal.style';
const Modal = (props: ModalProps): JSX.Element => {
  // const theme = useTheme();

  const { title, overline, isOpen, onClickClose, children } = props;

  return (
    <Backdrop isOpen={isOpen}>
      <Row className="row" justify="center" align="center">
        <Col sm={4}>
          <ModalContainer>
            <ExitButton onClick={onClickClose}>
              <Close />
            </ExitButton>

            <Typography variant="title4" color="noshade" className="title">
              {title}
            </Typography>

            <div className="content-container">
              <Typography
                variant="overline"
                color="warning"
                weight="Black"
                className="overline"
              >
                {overline}
              </Typography>

              {children}
            </div>

            <Button variant="primary" text="Ok" onClick={onClickClose} />
          </ModalContainer>
        </Col>
      </Row>
    </Backdrop>
  );
};

export default React.memo(Modal);
