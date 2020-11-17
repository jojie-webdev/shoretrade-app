import React from 'react';

import { storiesOf } from '@storybook/react';

import BuyerAssistantForm from '../../../src/components/module/BuyerAssistantForm';
import Container from '../../components/Container';

storiesOf('module/BuyerAssistantForm', module).add('Summary', () => (
  <Container>
    <BuyerAssistantForm />
  </Container>
));
