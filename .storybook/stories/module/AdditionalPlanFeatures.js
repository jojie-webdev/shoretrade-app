import React from 'react';

import { storiesOf } from '@storybook/react';

import AdditionalPlanFeatures from '../../../src/components/module/AdditionalPlanFeatures';
import Container from '../../components/Container';

storiesOf('module/AdditionalPlanFeatures', module).add('Summary', () => (
  <Container>
    <AdditionalPlanFeatures />
  </Container>
));
