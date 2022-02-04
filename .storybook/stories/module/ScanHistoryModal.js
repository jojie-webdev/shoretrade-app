import React from 'react';

import { storiesOf } from '@storybook/react';

import ScanHistoryModal from '../../../src/components/module/ScanHistoryModal';
import Container from '../../components/Container';

storiesOf('module/ScanHistoryModal', module).add('Summary', () => (
  <Container>
    <ScanHistoryModal />
  </Container>
));
