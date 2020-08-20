import React from 'react';

import { storiesOf } from '@storybook/react';

import Loading from '../../../src/components/module/Loading';
import Container from '../../components/Container';

storiesOf('module/Loading', module).add('Summary', () => (
  <Container>
    <Loading />
  </Container>
));
