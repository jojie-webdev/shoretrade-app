import React from 'react';

import { storiesOf } from '@storybook/react';

import Card from '../../../src/components/module/Card';
import Container from '../../components/Container';

storiesOf('module/Card', module).add('Summary', () => (
  <Container>
    <Card />
  </Container>
));
