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
    actionIconPosition,
    actionIcon,
    actionText,
    cancelText,
    action,
    description,
    cancel,
    hideCancel,
    hideAction,
    switchBtns,
    switchBtnsEffect,
    disableActionText,
    ...modalProps
  } = props;

  const isSeller = theme.appType === 'seller';

  const renderTitle = () => (
    <>
      <Hidden xs sm>
        {typeof title === 'string' ? (
          <Typography
            variant="title4"
            color={isSeller ? 'noshade' : 'shade8'}
            className="title"
            altFont
          >
            {title}
          </Typography>
        ) : (
          title
        )}
      </Hidden>

      <Visible xs sm>
        {typeof title === 'string' ? (
          <Typography
            variant="title5"
            color={isSeller ? 'noshade' : 'shade8'}
            className="title"
            altFont
          >
            {title}
          </Typography>
        ) : (
          title
        )}
      </Visible>
    </>
  );

  return (
    <Modal {...modalProps}>
      <Content>
        {renderTitle()}
        <div className={!hideAction ? 'content-container' : ''}>
          {description && (
            <Typography
              variant="body"
              color={isSeller ? 'noshade' : 'shade8'}
              weight="Medium"
            >
              {description}
            </Typography>
          )}
          {children && <>{children}</>}
        </div>
        <div className="actions-container">
          {!switchBtns ? (
            <>
              {!hideCancel && (
                <Button
                  className="confirmation_modal__cancel_btn"
                  style={{ marginRight: 4, borderRadius: 12 }}
                  variant="outline"
                  text={cancelText || 'Cancel'}
                  onClick={cancel || modalProps.onClickClose}
                />
              )}
              {!hideAction && (
                <Button
                  className="confirmation_modal__ok_btn"
                  style={{ marginLeft: 8, borderRadius: 12 }}
                  variant="primary"
                  iconPosition={actionIconPosition}
                  icon={actionIcon}
                  text={actionText || 'OK'}
                  disabled={disableActionText}
                  onClick={() => {
                    action();
                  }}
                />
              )}
            </>
          ) : (
            <>
              {!hideAction && (
                <Button
                  className="confirmation_modal__ok_btn"
                  style={{ marginRight: 4, borderRadius: 12 }}
                  variant={switchBtnsEffect ? 'outline' : 'primary'}
                  iconPosition={actionIconPosition}
                  icon={actionIcon}
                  text={actionText || 'OK'}
                  disabled={disableActionText}
                  onClick={() => {
                    action();
                  }}
                />
              )}
              {!hideCancel && (
                <Button
                  className="confirmation_modal__cancel_btn"
                  style={{ marginLeft: 8, borderRadius: 12 }}
                  variant={switchBtnsEffect ? 'primary' : 'outline'}
                  text={cancelText || 'Cancel'}
                  onClick={cancel || modalProps.onClickClose}
                />
              )}
            </>
          )}
        </div>
      </Content>
    </Modal>
  );
};

export default ConfirmationModal;
