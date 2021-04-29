import React from 'react';

import { storiesOf } from '@storybook/react';

import HomeSellerCard from '../../../src/components/module/HomeSellerCard';
import Container from '../../components/Container';

storiesOf('module/HomeSellerCard', module).add('Summary', () => (
  <Container>
    <HomeSellerCard />
  </Container>
));
