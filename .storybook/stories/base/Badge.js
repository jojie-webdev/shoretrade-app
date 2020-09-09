import React from 'react';

import { storiesOf } from '@storybook/react';

import Badge from '../../../src/components/base/Badge';
import Container from '../../components/Container';

storiesOf('base/Badge', module).add('Summary', () => (
  <Container>
    <Badge />
  </Container>
));
