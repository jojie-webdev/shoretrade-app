import React, { useEffect } from 'react';

import { useTheme } from 'utils/Theme';
import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import Modal from 'components/layout/Modal';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';

import { DialogModalProps } from './DialogModal.props';
import { Content } from './DialogModal.style';

const DialogModal = (props: DialogModalProps): JSX.Element => {
  const theme = useTheme();
  const isBuyer = theme.appType === 'buyer';
  const { children, title, overline, ...modalProps } = props;
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        props.onClickClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  return (
    <Modal {...modalProps}>
      <Content>
        <Typography
          variant="title5"
          color={isBuyer ? 'shade9' : 'noshade'}
          className="title"
          align={isSmallScreen ? 'center' : 'left'}
        >
          {title}
        </Typography>
        <div className="content-container">
          <Typography
            variant="overline"
            color="alert"
            weight="Black"
            className="overline"
            align={isSmallScreen ? 'center' : 'left'}
          >
            {overline}
          </Typography>

          {children}
        </div>
        <Button
          variant="primary"
          text="Ok"
          onClick={modalProps.onClickClose}
          takeFullWidth={isSmallScreen}
        />{' '}
      </Content>
    </Modal>
  );
};

export default DialogModal;
