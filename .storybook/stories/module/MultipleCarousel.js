import React from 'react';

import { storiesOf } from '@storybook/react';

import MultipleCarousel from '../../../src/components/module/MultipleCarousel';
import SellerCard from '../../../src/components/module/SellerCard';
import mockImage from '../../../src/res/images/seller-profile-default.png';
import Container from '../../components/Container';

const mockData = [
  {
    img: mockImage,
    name: 'Mock Name 1',
  },
  {
    img: mockImage,
    name: 'Mock Name 2',
  },
  {
    img: mockImage,
    name: 'Mock Name 3',
  },
  {
    img: mockImage,
    name: 'Mock Name 4',
  },
  {
    img: mockImage,
    name: 'Mock Name 5',
  },
  {
    img: mockImage,
    name: 'Mock Name 6',
  },
];

const mockTransform = (data) => ({
  companyImage: data.img,
  companyName: data.name,
});

storiesOf('module/MultipleCarousel', module).add('Summary', () => (
  <Container>
    <MultipleCarousel
      data={mockData}
      transform={mockTransform}
      Component={SellerCard}
      link={() => {}}
    />
  </Container>
));
