import React from 'react';

import { storiesOf } from '@storybook/react';

import AddBoxModal from '../../../src/components/module/AddBoxModal';
import Container from '../../components/Container';

storiesOf('module/AddBoxModal', module).add('Summary', () => (
  <Container background="white">
    <AddBoxModal isOpen />
  </Container>
));
