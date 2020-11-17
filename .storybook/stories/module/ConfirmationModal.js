import React from 'react';

import { storiesOf } from '@storybook/react';

import ConfirmationModal from '../../../src/components/module/ConfirmationModal';
import Container from '../../components/Container';

storiesOf('module/ConfirmationModal', module).add('Summary', () => (
  <Container>
    <ConfirmationModal
      isOpen
      title="Delete Linked Account"
      description="Are you sure you want to delete this linked account?"
      action={() => console.log('DELETE ACTION')}
      actionText="DELETE"
      onClickClose={() => console.log('CANCEL')}
    />
  </Container>
));
