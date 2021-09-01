import React from 'react';

import { storiesOf } from '@storybook/react';

import TotalCard from '../../../src/components/base/TotalCard';
import Container from '../../components/Container';

storiesOf('base/TotalCard', module).add('Summary', () => (
  <Container>
    <TotalCard />
  </Container>
));
