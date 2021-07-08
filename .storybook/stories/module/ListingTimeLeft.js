import React from 'react';

import { storiesOf } from '@storybook/react';

import ListingTimeLeft from '../../../src/components/module/ListingTimeLeft';
import Container from '../../components/Container';

storiesOf('module/ListingTimeLeft', module).add('Summary', () => (
  <Container>
    <ListingTimeLeft />
  </Container>
));
