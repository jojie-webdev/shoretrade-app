import React from 'react';

import { storiesOf } from '@storybook/react';

import BoxRadio from '../../../src/components/module/BoxRadio';
import Container from '../../components/Container';

storiesOf('module/BoxRadio', module).add('Summary', () => (
  <Container>
    <BoxRadio />
  </Container>
));
