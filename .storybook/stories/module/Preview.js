import React from 'react';

import { storiesOf } from '@storybook/react';

import Preview from '../../../src/components/module/Preview';
import Container from '../../components/Container';

storiesOf('module/Preview', module).add('Summary', () => (
  <Container>
    <Preview />
  </Container>
));
