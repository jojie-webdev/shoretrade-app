import React from 'react';

import { storiesOf } from '@storybook/react';

import InteractionsV2 from '../../../src/components/base/InteractionsV2';
import Container from '../../components/Container';

storiesOf('base/InteractionsV2', module).add('Summary', () => (
  <Container>
    <InteractionsV2 />
  </Container>
));
