import React from 'react';

import { storiesOf } from '@storybook/react';

import Tab from '../../../src/components/base/Tab';
import Container from '../../components/Container';

storiesOf('base/Tab', module).add('Summary', () => (
  <Container>
    <Tab />
  </Container>
));
