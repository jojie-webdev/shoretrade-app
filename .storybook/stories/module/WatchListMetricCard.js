import React from 'react';

import { storiesOf } from '@storybook/react';

import WatchListMetricCard from '../../../src/components/module/WatchListMetricCard';
import Container from '../../components/Container';

storiesOf('module/WatchListMetricCard', module).add('Summary', () => (
  <Container>
    <WatchListMetricCard
      selected
      items={[
        {
          label: 'Fresh',
          value: '$57.01',
          trend: 'high',
        },
        {
          label: 'Frozen',
          value: '$32.52',
          trend: 'high',
        },
        {
          label: 'Live',
          value: '$50.38',
          trend: 'low',
        },
      ]}
      title="Product Specs"
    />
  </Container>
));

storiesOf('module/WatchListMetricCard', module).add('Product Size', () => (
  <Container>
    <WatchListMetricCard
      selected
      items={[
        {
          label: 'Small',
          value: '$57.01',
          subLabel: '(600-800)',
          trend: 'high',
        },
        {
          label: 'Frozen',
          value: '$32.52',
          trend: 'high',
        },
        {
          label: 'Live',
          value: '$50.38',
          trend: 'low',
        },
      ]}
      title="Product Specs"
    />
  </Container>
));

