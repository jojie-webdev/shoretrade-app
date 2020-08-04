import React from 'react';

// import { useTheme } from 'utils/Theme';
import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import Modal from 'components/layout/Modal';

import { DialogModalProps } from './DialogModal.props';
import { Content } from './DialogModal.style';

const DialogModal = (props: DialogModalProps): JSX.Element => {
  // const theme = useTheme();s
  const { children, title, overline, ...modalProps } = props;

  return (
    <Modal {...modalProps}>
      <Content>
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

        <Button variant="primary" text="Ok" onClick={modalProps.onClickClose} />
      </Content>
    </Modal>
  );
};

export default React.memo(DialogModal);
