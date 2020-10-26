import React from 'react';

import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import Modal from 'components/layout/Modal';
import { useTheme } from 'utils/Theme';

import { ConfirmationModalProps } from './ConfirmationModal.props';
import { Content } from './ConfirmationModal.style';

const ConfirmationModal = (props: ConfirmationModalProps): JSX.Element => {
  const theme = useTheme();
  const {
    children,
    title,
    actionText,
    cancelText,
    action,
    description,
    ...modalProps
  } = props;

  const isSeller = theme.appType === 'seller';

  return (
    <Modal {...modalProps}>
      <Content>
        <Typography
          variant="title4"
          color={isSeller ? 'noshade' : 'shade8'}
          className="title"
        >
          {title}
        </Typography>

        <div className="content-container">
          <Typography
            variant="body"
            color={isSeller ? 'noshade' : 'shade8'}
            weight="Medium"
          >
            {description}
          </Typography>
        </div>
        <div className="actions-container">
          <Button
            style={{ flex: 1, marginRight: 8 }}
            variant="outline"
            text={cancelText || 'Cancel'}
            onClick={modalProps.onClickClose}
          />
          <Button
            style={{ flex: 1, marginLeft: 8 }}
            variant="primary"
            text={actionText || 'OK'}
            onClick={() => {
              action();
            }}
          />
        </div>
      </Content>
    </Modal>
  );
};

export default ConfirmationModal;
