import React from 'react';

import { storiesOf } from '@storybook/react';

import SubscriptionAlert from '../../../src/components/module/SubscriptionAlert';
import Container from '../../components/Container';

storiesOf('module/SubscriptionAlert', module).add('Summary', () => (
  <Container>
    <SubscriptionAlert />
  </Container>
));
