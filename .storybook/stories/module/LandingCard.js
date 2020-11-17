import React from 'react';

import { storiesOf } from '@storybook/react';

import LandingCard from '../../../src/components/module/CategoryCards/Landing';
import Container from '../../components/Container';
const data = {
  sortIndex: 0,
  id: '3ae0f9a5-15c2-4efe-9a75-1956762019a9',
  image:
    'https://s3-ap-southeast-2.amazonaws.com/shoretrade-prod-assets/category/Whole-Fish.jpg',
  label: 'Whole Fish',
};
storiesOf('module/LandingCard', module).add('Summary', () => (
  <Container>
    <LandingCard
      sortIndex={data.sortIndex}
      id={data.id}
      image={data.image}
      label={data.label} />
  </Container>
));
