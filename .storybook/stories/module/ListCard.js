import React from 'react';

import { storiesOf } from '@storybook/react';

import ListCard from '../../../src/components/module/ListCard';
import Container from '../../components/Container';

storiesOf('module/ListCard', module).add('Summary', () => (
  <Container>
    <ListCard />
  </Container>
));
