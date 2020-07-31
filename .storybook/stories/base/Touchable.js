import React from 'react';

import { storiesOf } from '@storybook/react';

import { Close } from '../../../src/components/base/SVG';
import Touchable from '../../../src/components/base/Touchable';
import Container from '../../components/Container';

storiesOf('base/Touchable', module).add('Summary', () => (
  <Container>
    <Touchable onPress={() => console.log('TOUCHABLE_ACTION')}>
      <Close />
    </Touchable>
  </Container>
));
