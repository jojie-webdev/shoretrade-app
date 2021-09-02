import React from 'react';

import Button from 'components/base/Button';
import Typography from 'components/base/Typography';
import Modal from 'components/layout/Modal';
import { Hidden, Visible } from 'react-grid-system';
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
    cancel,
    ...modalProps
  } = props;

  const isSeller = theme.appType === 'seller';

  const renderTitle = () => (
    <>
      <Hidden xs sm>
        <Typography
          variant="title4"
          color={isSeller ? 'noshade' : 'shade8'}
          className="title"
          style={{ fontFamily: 'Media Sans' }}
        >
          {title}
        </Typography>
      </Hidden>

      <Visible xs sm>
        <Typography
          variant="title5"
          color={isSeller ? 'noshade' : 'shade8'}
          className="title"
          style={{ fontFamily: 'Media Sans' }}
        >
          {title}
        </Typography>
      </Visible>
    </>
  );

  return (
    <Modal {...modalProps}>
      <Content>
        {renderTitle()}
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
            style={{ marginRight: 4, borderRadius: 12 }}
            variant="outline"
            text={cancelText || 'Cancel'}
            onClick={cancel || modalProps.onClickClose}
          />
          <Button
            style={{ marginLeft: 8, borderRadius: 12 }}
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
