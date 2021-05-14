import React from 'react';

import { storiesOf } from '@storybook/react';

import { TrashCan } from '../../../src/components/base/SVG';
import SwipeableInteraction from '../../../src/components/module/SwipeableInteraction';
import Container from '../../components/Container';

const data = [
  {
    type: 'next',
    value: 'Test Value',
  },
];

storiesOf('module/SwipeableInteraction', module).add('Summary', () => (
  <Container>
    <SwipeableInteraction
      onSwipeTrigger={() => {
        alert('Triggered');
      }}
      swipeActionIcon={<TrashCan fill={'#FFF'} width={16} height={16} />}
      swipeActionLabel="Delete"
      data={data}
    />
  </Container>
));
