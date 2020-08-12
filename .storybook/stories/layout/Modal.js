import React from 'react';

import { storiesOf } from '@storybook/react';

import Typography from '../../../src/components/base/Typography';
import Modal from '../../../src/components/layout/Modal';
import Container from '../../components/Container';

const modalProps = {
  isOpen: true,
};

storiesOf('layout/Modal', module).add('Summary', () => (
  <Container background="white">
    <Modal {...modalProps}>
      <Typography variant="body" color="noshade" weight="Medium">
        This is the base modal, refer to {'<DialogModal>'}
      </Typography>
    </Modal>
  </Container>
));
