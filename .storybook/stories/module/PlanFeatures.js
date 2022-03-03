import React from 'react';

import { storiesOf } from '@storybook/react';

import PlanFeatures from '../../../src/components/module/PlanFeatures';
import Container from '../../components/Container';

storiesOf('module/PlanFeatures', module).add('Summary', () => (
  <Container>
    <PlanFeatures />
  </Container>
));
