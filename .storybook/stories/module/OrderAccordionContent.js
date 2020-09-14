import React from 'react';

import { storiesOf } from '@storybook/react';

import OrderAccordionContent from '../../../src/components/module/OrderAccordionContent';
import Container from '../../components/Container';

const detailsProps = [{
    uri: 'https://picsum.photos/id/995/500/500.jpg',
    name: 'King Salmon Manuka Cold Smoked Sliced',
    price: '1,4400.00',
    tags: [
      {
        label: 'Fresh',
      },
      {
        label: 'Farmed',
      },
      {
        label: 'Head on Gutted',
      },
    ],
    weight: '12',
    unit: 'Kg',
    size: 'Baby – Extra Large',
    location: 'NSW',
    vendor: 'Peter Manettas',
    cBorderRadius: '0',
    cBorderWidth: '0',
  }];

storiesOf('module/OrderAccordionContent', module).add('Buyer', () => (
  <Container appType='buyer'>
    <OrderAccordionContent 
        orderNumber="0000-0266"
        seller="Manettas Seafood"
        orderedBy="Lorenzo Bocchi"
        detailsProps={detailsProps}
        shippingOption="Road freight delivery to door"
        shippingPrice="22.00"
        total="1,462.00"
    />
  </Container>
));
