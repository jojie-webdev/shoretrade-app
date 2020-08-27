import React from 'react';

import { storiesOf } from '@storybook/react';

import ToShipAccordionContent from '../../../src/components/module/ToShipAccordionContent';
import Container from '../../components/Container';

const items = [
  {
    orderNumber: '#0000-0266',
    buyer: 'Manettas Seafood',
    uri:
      'https://www.cameraegg.org/wp-content/uploads/2013/02/Leica-M-Sample-Image-1024x684.jpg',
    price: '$1,440.00',
    weight: '12 Kg',
    name: 'King Salmon Manuka Cold Smoked Sliced',
    tags: [
      { label: 'Fresh' },
      { label: 'Farmed' },
      { label: 'Head on Gutted' },
    ],
    size: 'Baby – Extra Large',
  },
];

storiesOf('module/ToShipAccordionContent', module).add('Summary', () => (
  <Container>
    <ToShipAccordionContent items={[...items, ...items]} onPress={() => null} />
  </Container>
));
