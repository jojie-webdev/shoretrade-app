import React from 'react';

import { storiesOf } from '@storybook/react';

import OrderItem from '../../../src/components/module/OrderItem';
import Container from '../../components/Container';

const MOCK_DATA = {
  id: '975677db-2894-4a47-ba5e-51d0a3b63bf7',
  confirmed: true,
  data: {
    orderRefNumber: 260,
    orderNumber: '#0000-0260',
    seller: 'Manettas Seafood',
    orderedBy: 'Jon Test Ablondi',
    detailsProps: [
      {
        uri:
          'https://s3-ap-southeast-2.amazonaws.com/shoretrade-prod-assets/type-default/CaviarAndRoe/Sea-Urchin-Roe.jpg',
        name: 'Sea Urchin Roe',
        price: '$484.00',
        tags: [{ label: 'Fresh' }],
        weight: '22.00',
        unit: 'kg',
        size: 'Ungraded',
        location: 'Devonport',
        vendor: 'Manettas Seafood',
        cBorderRadius: '0',
        cBorderWidth: '0',
      },
    ],
    shippingOption: 'Road freight delivery to door',
    shippingFrom: 'Seaforth, NSW',
    shippingTo: '2-12 Foveaux St, Surry Hills, NSW, 2010',
    shippingPrice: '$22.00',
    shippingChargeGst: 2,
    shippingChargeNet: 20,
    total: '$506.00',
  },
  estCatchmentDate: '2020-02-06T16:00:00.000Z',
  estDeliveryDate: '2020-02-07T01:00:00.000Z',
  deliveredDate: '2020-02-07T01:00:00.000Z',
  price: '$506.00',
  isAquafuture: false,
};

storiesOf('module/OrderItem', module).add('Summary', () => (
  <Container>
    <OrderItem {...MOCK_DATA} />
  </Container>
));
