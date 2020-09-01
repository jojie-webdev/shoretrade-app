import React from 'react';

import { storiesOf } from '@storybook/react';

import SellerAssistantForm from '../../../src/components/module/SellerAssistantForm';
import Container from '../../components/Container';

storiesOf('module/SellerAssistantForm', module).add('Summary', () => (
  <Container>
    <SellerAssistantForm />
  </Container>
));
