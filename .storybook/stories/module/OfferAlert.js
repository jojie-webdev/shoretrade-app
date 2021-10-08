import React from 'react';

import { storiesOf } from '@storybook/react';

import OfferAlert from '../../../src/components/module/OfferAlert';
import Container from '../../components/Container';

storiesOf('module/OfferAlert', module).add('Summary', () => (
  <Container>
    <OfferAlert />
  </Container>
));
