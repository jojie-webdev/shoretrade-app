import React from 'react';

import { storiesOf } from '@storybook/react';

import MarketSectorIcon from '../../../src/components/module/MarketSectorIcon';
import Container from '../../components/Container';

storiesOf('module/MarketSectorIcon', module).add('Summary', () => (
  <Container>
    <MarketSectorIcon />
  </Container>
));
