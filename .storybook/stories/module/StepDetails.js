import React from 'react';

import { storiesOf } from '@storybook/react';

import StepDetails from '../../../src/components/module/StepDetails';
import Container from '../../components/Container';

storiesOf('module/StepDetails', module).add('Summary', () => (
  <Container background="#111E2B">
    <StepDetails
      step={1}
      title="Your Details"
      description="Provide your contact details so we can get your account set up and running."
    />
  </Container>
));
