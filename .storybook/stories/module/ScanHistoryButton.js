import React from 'react';

import { storiesOf } from '@storybook/react';

import ScanHistoryButton from '../../../src/components/module/ScanHistoryButton';
import Container from '../../components/Container';

storiesOf('module/ScanHistoryButton', module).add('Summary', () => (
  <Container>
    <ScanHistoryButton />
  </Container>
));
