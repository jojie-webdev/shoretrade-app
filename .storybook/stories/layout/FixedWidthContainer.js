import React from 'react';

import { storiesOf } from '@storybook/react';

import FixedWidthContainer from '../../../src/components/layout/FixedWidthContainer';
import Container from '../../components/Container';

storiesOf('layout/FixedWidthContainer', module).add('Summary', () => (
  <Container>
    <FixedWidthContainer />
  </Container>
));
