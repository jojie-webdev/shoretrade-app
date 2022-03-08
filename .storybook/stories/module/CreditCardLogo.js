import React from 'react';

import { storiesOf } from '@storybook/react';

import CreditCardLogo from '../../../src/components/module/CreditCardLogo';
import Container from '../../components/Container';

storiesOf('module/CreditCardLogo', module).add('Summary', () => (
  <Container>
    <CreditCardLogo />
  </Container>
));
