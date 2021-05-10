import React from 'react';

import { storiesOf } from '@storybook/react';

import SegmentedV2 from '../../../src/components/base/SegmentedV2';
import Container from '../../components/Container';

storiesOf('base/SegmentedV2', module).add('Summary', () => (
  <Container>
    <SegmentedV2 />
  </Container>
));
