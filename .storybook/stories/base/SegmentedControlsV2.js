import React from 'react';

import { storiesOf } from '@storybook/react';

import SegmentedControlsV2 from '../../../src/components/base/SegmentedControlsV2';
import Container from '../../components/Container';

storiesOf('base/SegmentedControlsV2', module).add('Summary', () => (
  <Container>
    <SegmentedControlsV2 />
  </Container>
));
