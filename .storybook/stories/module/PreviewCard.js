import React from 'react';

import { storiesOf } from '@storybook/react';

import Preview from '../../../src/components/module/CategoryCards/Preview';
import Container from '../../components/Container';
const data = {
  id: 'ff9cdcab-57eb-45dd-ac99-aaf21fcd5c00',
  images: [
    'https://shoretrade-prod-assets.s3.ap-southeast-2.amazonaws.com/listings/f579186ec1109ff68ca98e2131c52058.jpeg',
    'https://shoretrade-prod-assets.s3.ap-southeast-2.amazonaws.com/listings/10e5bc1a141680e230a72336883ba54f.jpeg',
    'https://shoretrade-prod-assets.s3.ap-southeast-2.amazonaws.com/listings/811694416fb40210a1dc896d7738a60d.jpeg',
    'https://shoretrade-prod-assets.s3.ap-southeast-2.amazonaws.com/listings/2382a45f91d4320a7423f4918217331c.jpeg',
  ],
  type: 'Murray Cod',
  price: '$22.00',
  remaining: '150.00',
  coop: { name: 'Goodoo Farms' },
  minimumOrder: '15.00',
  origin: { state: 'NSW', suburb: 'Yanco', countryCode: 'AU' },
  weight: '1.3kg - 1.8kg',
  isAquafuture: true,
  unit: 'kg',
  state: ['Fresh', 'Farmed', 'Whole'],
};

storiesOf('module/Preview', module).add('Summary', () => (
  <Container>
    <Preview
      id={data.id}
      images={data.images}
      type={data.type}
      price={data.price}
      remaining={data.remaining}
      coop={data.coop}
      minimumOrder={data.minimumOrder}
      origin={data.origin}
      weight={data.weight}
      isAquafuture={data.isAquafuture}
      unit={data.unit}
      state={data.state}
    />
  </Container>
));
