import React, { useEffect, useState } from 'react';

import Button from 'components/base/Button';
import TextArea from 'components/base/TextArea';
import Typography from 'components/base/Typography';
import Modal from 'components/layout/Modal';
import { useTheme } from 'utils/Theme';

import { MessageModalProps } from './MessageModal.props';
import { Content } from './MessageModal.style';

const MessageModal = (props: MessageModalProps): JSX.Element => {
  const theme = useTheme();
  const { children, recipient, onSend, ...modalProps } = props;

  const isSeller = theme.appType === 'seller';

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!modalProps.isOpen) {
      setMessage('');
    }
  }, [modalProps.isOpen]);

  return (
    <Modal {...modalProps} style={{ maxWidth: '438px' }}>
      <Content>
        <Typography
          variant="title4"
          color={isSeller ? 'noshade' : 'shade8'}
          className="title"
        >
          Message: {recipient}
        </Typography>

        <div className="content-container">
          <Typography
            variant="body"
            color={isSeller ? 'shade5' : 'shade7'}
            weight="Medium"
          >
            Consider messaging the buyer directly to update them on the progress
            of an order. If you think you&apos;ll be unable to fulfill all the
            orders, please contact Shoretrade for assistance instead.
          </Typography>

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
