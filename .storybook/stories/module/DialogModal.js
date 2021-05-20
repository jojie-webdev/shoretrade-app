import React from 'react';

import { storiesOf } from '@storybook/react';

import Typography from '../../../src/components/base/Typography';
import DialogModal from '../../../src/components/module/DialogModal';
import Container from '../../components/Container';

const MOCK_TITLE = 'Thanks for signing up!';
const MOCK_OVERLINE = 'Your account is pending approval.';

const modalProps = {
  title: MOCK_TITLE,
  overline: MOCK_OVERLINE,
  isOpen: true,
};

storiesOf('module/DialogModal', module).add('Summary', () => (
  <Container background="white">
    <DialogModal {...modalProps}>
      <Typography variant="body" color="noshade" weight="Medium">
        We need to check a few things before you can start selling.
      </Typography>
      <br />
      <Typography variant="body" color="noshade" weight="Medium">
        We’ll send you an email when your account is approved.
      </Typography>
    </DialogModal>
  </Container>
));
