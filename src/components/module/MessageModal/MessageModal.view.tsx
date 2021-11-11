import React, { useEffect, useState } from 'react';

import Button from 'components/base/Button';
import TextArea from 'components/base/TextArea';
import Typography from 'components/base/Typography';
import Modal from 'components/layout/Modal';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useTheme } from 'utils/Theme';

import { MessageModalProps } from './MessageModal.props';
import { Content } from './MessageModal.style';

const MessageModal = (props: MessageModalProps): JSX.Element => {
  const { children, recipient, onSend, loading, ...modalProps } = props;
  const theme = useTheme();
  const buyerApp = theme.appType === 'buyer';

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!modalProps.isOpen) {
      setMessage('');
    }
  }, [modalProps.isOpen]);

  return (
    <Modal {...modalProps} style={{ borderRadius: '12px', width: '438px' }}>
      <Content>
        <Typography
          variant="title4"
          color={!buyerApp ? 'noshade' : 'shade9'}
          className="title"
        >
          {/* Message: {recipient} */}
          {!buyerApp ? `Message: ${recipient}` : `${recipient}`}
        </Typography>

        <div className="content-container">
          {!buyerApp ? (
            <Typography variant="body" color={'shade5'} weight="Medium">
              Consider messaging the buyer directly to update them on the
              progress of an order. If you think you&apos;ll be unable to
              fulfill all the orders, please contact Shoretrade for assistance
              instead.
            </Typography>
          ) : (
            <Typography variant="body" color="shade9" weight="Medium">
              Raising a dispute will send the order details to ShoreTrade for
              review. Please enter any information about the dispute below for
              our Disputes team to consider.
            </Typography>
          )}

          <TextArea
            style={{ marginTop: 16 }}
            value={message}
            onChangeText={setMessage}
            placeholder="Please type message in here"
            height={100}
          />
        </div>
        <div className="actions-container">
          <Button
            style={{ flex: 1, marginRight: 8 }}
            variant="outline"
            text="Cancel"
            onClick={modalProps.onClickClose}
          />
          <Button
            style={{ flex: 1, marginLeft: 8 }}
            variant="primary"
            text={'Send'}
            loading={loading}
            onClick={() => {
              if (message.length > 0) {
                onSend(message);
              }
            }}
          />
        </div>
      </Content>
    </Modal>
  );
};

export default MessageModal;
