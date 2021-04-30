import React from 'react';

import { storiesOf } from '@storybook/react';

import BottomButtonAction from '../../../src/components/module/BottomButtonAction';
import Container from '../../components/Container';

storiesOf('module/BottomButtonAction', module).add('Summary', () => (
  <Container>
    <BottomButtonAction />
  </Container>
));
