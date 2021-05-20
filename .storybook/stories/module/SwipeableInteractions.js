import React from 'react';

import { storiesOf } from '@storybook/react';

import { TrashCan } from '../../../src/components/base/SVG';
import SwipeableInteraction from '../../../src/components/module/SwipeableInteraction';
import Container from '../../components/Container';

const data = [
  {
    id: 1,
    type: 'next',
    value: 'Test Value',
  },
  {
    id: 2,
    type: 'next',
    value: 'Test Value',
  },
];

storiesOf('module/SwipeableInteraction', module).add('Summary', () => (
  <Container>
    <SwipeableInteraction
      onSwipeTrigger={(id) => {
        console.log(`Triggered, ${id}`);
      }}
      swipeActionIcon={<TrashCan fill={'#FFF'} width={16} height={16} />}
      swipeActionLabel="Delete"
      data={data}
    />
  </Container>
));
