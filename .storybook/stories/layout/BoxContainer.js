import React from 'react';

import { storiesOf } from '@storybook/react';

import BoxContainer from '../../../src/components/layout/BoxContainer';
import Container from '../../components/Container';

storiesOf('layout/BoxContainer', module).add('Summary', () => (
  <Container>
    <BoxContainer />
  </Container>
));
