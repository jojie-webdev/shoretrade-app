import React from 'react';

import { storiesOf } from '@storybook/react';

import SellerCard from '../../../src/components/module/SellerCard';
import Container from '../../components/Container';

storiesOf('module/SellerCard', module).add('Summary', () => (
  <Container>
    <SellerCard />
  </Container>
));
