import React from 'react';

import { storiesOf } from '@storybook/react';

import OfferTag from '../../../src/components/module/OfferTag';
import Container from '../../components/Container';

const offer = {
    "id": "a812ec2f-6b90-4691-b291-33900788819f",
    "status": "ACCEPTED",
    "createdAt": "2021-09-22T03:47:18.658+00:00",
    "price": 5,
    "weight": 5,
    "size": {
      "from": "5",
      "to": null
    },
    "measurementUnit": "KG",
    "metric": "Grams",
    "specifications": [
      "Frozen",
      "Farmed",
      "Head On Gutted"
    ],
    "negotiations": null,
    "deliveryDate": "2021-09-30T04:00:00+00:00",
    "paymentRequired": false,
    "shippingFrom": {
      "id": "f47cf8cd-f98b-4b6a-a5f4-3a185dd6daea",
      "level": "",
      "state": "NSW",
      "suburb": "Surry Hills",
      "postcode": "2010",
      "street_name": "Foveaux St",
      "unit_number": "",
      "country_code": "AU",
      "street_number": "2-12",
      "depot_address_id": null,
      "flat_delivery_fee": null
    },
    "orderRefNumber": 1284
  
};

storiesOf('module/OfferTag', module).add('Summary', () => (
  <Container>
    <OfferTag offer={offer} marketRequestAvgPrice={5} />
  </Container>
));
