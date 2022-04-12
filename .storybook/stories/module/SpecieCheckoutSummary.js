import React from 'react';

import { storiesOf } from '@storybook/react';
import { GetSpecieResponseItem } from 'types/store/GetSpeciesState';

import SpecieCheckoutSummary from '../../../src/components/module/SpecieCheckoutSummary';
import Container from '../../components/Container';

storiesOf('module/SpecieCheckoutSummary', module).add('Summary', () => (
  <Container>
    <SpecieCheckoutSummary
      items={[
        {
          id: '01',
          name: 'Barramundi',
          price: 12.5,
        },
        {
          id: '02',
          name: 'Murray Code',
          price: 12.5,
        },
        {
          id: '03',
          name: 'Snapper',
          price: 12.5,
        },
        {
          id: '04',
          name: 'Silver Bream',
          price: 12.5,
        },
        {
          id: '05',
          name: ' Blue Mackerel',
          price: 12.5,
        },
      ]}
    />
  </Container>
));

storiesOf('module/SpecieCheckoutSummary', module).add('Checkout', () => (
  <Container>
    <SpecieCheckoutSummary
      onClickCheckout={() => console.log('checkout')}
      items={[
        {
          id: '01',
          name: 'Barramundi',
          price: 12.5,
        },
        {
          id: '02',
          name: 'Murray Code',
          price: 12.5,
        },
        {
          id: '03',
          name: 'Snapper',
          price: 12.5,
        },
        {
          id: '04',
          name: 'Silver Bream',
          price: 12.5,
        },
        {
          id: '05',
          name: ' Blue Mackerel',
          price: 12.5,
        },
      ]}
    />
  </Container>
));
