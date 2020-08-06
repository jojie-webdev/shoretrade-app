import React from 'react';

import { storiesOf } from '@storybook/react';

import Spinner from '../../../src/components/base/Spinner';
import Container from '../../components/Container';

storiesOf('base/Spinner', module).add('Summary', () => (
  <Container>
    <Spinner />
  </Container>
));
