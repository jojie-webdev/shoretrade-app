import React from 'react';

import { storiesOf } from '@storybook/react';

import SmartCard from '../../../src/components/module/SmartCard';
import Container from '../../components/Container';

storiesOf('module/SmartCard', module).add('Summary', () => (
  <Container>
    <SmartCard />
  </Container>
));
