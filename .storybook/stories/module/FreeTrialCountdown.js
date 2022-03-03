import React from 'react';

import { storiesOf } from '@storybook/react';

import FreeTrialCountdown from '../../../src/components/module/FreeTrialCountdown';
import Container from '../../components/Container';

storiesOf('module/FreeTrialCountdown', module).add('Summary', () => (
  <Container>
    <FreeTrialCountdown />
  </Container>
));
