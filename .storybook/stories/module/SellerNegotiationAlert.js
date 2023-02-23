import React from 'react';

import { storiesOf } from '@storybook/react';

import SellerNegotiationAlert from '../../../src/components/module/SellerNegotiationAlert';
import Container from '../../components/Container';

storiesOf('module/SellerNegotiationAlert', module).add('Summary', () => (
  <Container>
    <SellerNegotiationAlert />
  </Container>
));
