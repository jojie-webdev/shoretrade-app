import React from 'react';

import { storiesOf } from '@storybook/react';

import RefreshCreditButton from '../../../src/components/module/RefreshCreditButton';
import Container from '../../components/Container';

storiesOf('module/RefreshCreditButton', module).add('Summary', () => (
  <Container>
    <RefreshCreditButton />
  </Container>
));
